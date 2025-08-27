import {IConfig} from 'app/store/types/appConfig';
import {ReportData} from 'app/screens/popups/ErrorPopupScreen';
import {walletApi} from './api';

export const sendFeedback = (config: IConfig, feedBackData: ReportData) =>
    walletApi(config).post('/api/v0.6/feedback', feedBackData);
