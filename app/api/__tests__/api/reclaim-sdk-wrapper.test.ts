import type { IConfig } from 'app/store/types/appConfig';
import type { Dictionary } from 'app/utilities/types';

import { vclLogger } from 'app/utilities/logger';
import {
    assertReclaimEnabled,
    ReclaimSdkWrapper,
    type ReclaimProofBundle,
} from 'app/api/reclaim/reclaim-sdk-wrapper';
import { ReclaimVerification } from '@reclaimprotocol/inapp-rn-sdk';

jest.mock('app/utilities/logger', () => {
    const info = jest.fn();
    const warn = jest.fn();
    const error = jest.fn();
    return { vclLogger: { info, warn, error } };
});

jest.mock('app/utilities/helpers', () => ({
    hasValue: (v: unknown) => v != null && String(v).trim().length > 0,
}));


jest.mock('@reclaimprotocol/inapp-rn-sdk', () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    class ReclaimVerification {
        startVerification = jest.fn();

        static ExceptionType = { Failed: 'Failed', Unknown: 'Unknown' } as const;
    }
    return { ReclaimVerification };
});

describe('assertReclaimEnabled', () => {
    const base: IConfig = { reclaim: undefined } as any;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns null and logs when reclaim config is missing', () => {
        const result = assertReclaimEnabled({ ...base, reclaim: undefined } as any);
        expect(result).toBeNull();
        expect(vclLogger.info).toHaveBeenCalledWith(
            'Reclaim config not present, feature is optional'
        );
    });

    it('returns null and logs when reclaim is disabled', () => {
        const result = assertReclaimEnabled({
            ...base,
            reclaim: { enabled: false, appId: '', secret: '' } as any,
        } as any);
        expect(result).toBeNull();
        expect(vclLogger.info).toHaveBeenCalledWith(
            'Reclaim feature disabled in this environment'
        );
    });

    it('throws when enabled but appId or secret is missing', () => {
        expect(() =>
            assertReclaimEnabled({
                ...base,
                reclaim: { enabled: true, appId: '', secret: 's' } as any,
            } as any)
        ).toThrow('Reclaim appId and secret are required when enabled');

        expect(vclLogger.error).toHaveBeenCalledWith(
            'Reclaim credentials are missing or empty'
        );
    });

    it('throws when enabled but appId is whitespace only', () => {
        expect(() =>
            assertReclaimEnabled({
                ...base,
                reclaim: { enabled: true, appId: '   ', secret: 'S' } as any,
            } as any)
        ).toThrow('Reclaim appId and secret are required when enabled');
    });

    it('returns reclaim config when enabled and credentials provided', () => {
        const reclaim = { enabled: true, appId: 'APP', secret: 'SEC' } as any;
        const out = assertReclaimEnabled({ ...base, reclaim } as any);
        expect(out).toBe(reclaim);
        expect(vclLogger.info).not.toHaveBeenCalled();
        expect(vclLogger.error).not.toHaveBeenCalled();
    });
});

describe('ReclaimSdkWrapper.startVerification', () => {
    const providerId = 'prov-1';
    const appId = 'app-1';
    const secret = 'sec-1';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns proofs bundle on success', async () => {
        const proofs: Dictionary<any>[] = [{ foo: 'bar' }];
        const sessionId = 'sess-123';
        const didSubmitManualVerification = false;

        const sdkMock = {
            startVerification: jest.fn().mockResolvedValue({
                proofs,
                sessionId,
                didSubmitManualVerification,
            } satisfies ReclaimProofBundle),
        };

        const wrapper = new ReclaimSdkWrapper(sdkMock as any);
        const result = await wrapper.startVerification(providerId, appId, secret);

        expect(result).toEqual<ReclaimProofBundle>({
            proofs,
            sessionId,
            didSubmitManualVerification,
        });
        expect(sdkMock.startVerification).toHaveBeenCalledWith({
            providerId,
            appId,
            secret,
        });
    });

    it('maps exception fields on failure', async () => {
        const err = {
            message: 'Boom',
            innerError: new Error('inner'),
            type: ReclaimVerification.ExceptionType.Failed,
            sessionId: 'S-1',
            didSubmitManualVerification: true,
            reason: 'Bad',
        };

        const sdkMock = {
            startVerification: jest.fn().mockRejectedValue(err),
        };

        const wrapper = new ReclaimSdkWrapper(sdkMock as any);
        const result = await wrapper.startVerification(providerId, appId, secret);

        expect(result).toEqual<ReclaimProofBundle>({
            exception: {
                message: 'Boom',
                innerError: err.innerError,
                type: ReclaimVerification.ExceptionType.Failed,
                sessionId: 'S-1',
                didSubmitManualVerification: true,
                reason: 'Bad',
            },
        });
        expect(sdkMock.startVerification).toHaveBeenCalledWith({
            providerId,
            appId,
            secret,
        });
    });

    it('handles non object errors gracefully', async () => {
        const sdkMock = {
            startVerification: jest.fn().mockRejectedValue('fail'),
        };

        const wrapper = new ReclaimSdkWrapper(sdkMock as any);
        const result = await wrapper.startVerification(providerId, appId, secret);

        expect(result).toEqual<ReclaimProofBundle>({
            exception: {
                message: undefined,
                innerError: undefined,
                type: undefined,
                sessionId: undefined,
                didSubmitManualVerification: undefined,
                reason: undefined,
            },
        });
    });
});
