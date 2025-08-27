import {isShouldUpdateVersion} from '../ConnectionWatcher/ConnectionWatcher.utils';

describe('Connection Watcher utils', () => {
    describe('isShouldUpdateVersion function', () => {
        it('should return true if a config version greater that an app version', async () => {
            expect(isShouldUpdateVersion('2.0.1', '1.0.1')).toBeTruthy();
            expect(isShouldUpdateVersion('1.1.1', '1.0.1')).toBeTruthy();
            expect(isShouldUpdateVersion('1.0.2', '1.0.1')).toBeTruthy();
            expect(isShouldUpdateVersion('1.1.1', '1.0.4')).toBeTruthy();
            expect(isShouldUpdateVersion('1.04.2', '1.0.1')).toBeTruthy();
            expect(isShouldUpdateVersion('1.50.2', '1.5.2')).toBeTruthy();
        });
        it('should return false if a config version equals to an app version', async () => {
            expect(isShouldUpdateVersion('1.10.1', '1.10.1')).toBeFalsy();
            expect(isShouldUpdateVersion('02.2.3', '2.2.3')).toBeFalsy();
            expect(isShouldUpdateVersion('2.02.3', '2.2.3')).toBeFalsy();
            expect(isShouldUpdateVersion('2.2.03', '2.2.3')).toBeFalsy();
            expect(isShouldUpdateVersion('2.2.03', '02.2.3')).toBeFalsy();
            expect(isShouldUpdateVersion('2.2.03', '2.02.3')).toBeFalsy();
            expect(isShouldUpdateVersion('2.2.03', '2.2.03')).toBeFalsy();
        });
        it('should return false if a config version less than an app version', async () => {
            expect(isShouldUpdateVersion('1.5.1', '1.10.1')).toBeFalsy();
            expect(isShouldUpdateVersion('1.05.1', '1.10.1')).toBeFalsy();
            expect(isShouldUpdateVersion('1.2.1', '1.3.1')).toBeFalsy();
            expect(isShouldUpdateVersion('1.2.1', '2.2.1')).toBeFalsy();
            expect(isShouldUpdateVersion('1.3.2', '1.3.3')).toBeFalsy();
        });
    });
});
