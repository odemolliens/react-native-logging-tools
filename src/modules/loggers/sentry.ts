import { ISentry } from '../../model/sentry';
import { excludeLogs } from '../init';

export const createSentryLogger = (sentry: any, config: ISentry, printLogs: boolean = false) => {
  sentry.init({ dsn: config.dsn });
  // @ts-ignore
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.sentry && excludeLogs.sentry.includes(eventType)) {
      return;
    }
    try {
      sentry.captureMessage(event);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag sentry event:', error);
      }
    }
  };
};
