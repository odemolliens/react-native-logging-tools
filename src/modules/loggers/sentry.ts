import { ISentry } from '../../model/sentry';
import {excludeLogs, sendEventToFlipper} from '../init';

export const createSentryLogger = (sentry: any, config: ISentry, printLogs: boolean = false) => {
  sentry.init({ dsn: config.dsn });
  sendEventToFlipper('sentry', 'Sentry analytics connected successfully');
  // @ts-ignore
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.sentry && excludeLogs.sentry.includes(eventType)) {
      return;
    }
    try {
      sentry.captureMessage(event);
      sendEventToFlipper('sentry', event, params);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag sentry event:', error);
      }
      sendEventToFlipper('sentry', event, params, error);
    }
  };
};
