import { ISentry } from '../../model/sentry';

export const createSentryLogger = (sentry: any, config: ISentry, printError: boolean = false) => {
  sentry.init({ dsn: config.dsn });
  // @ts-ignore
  return (event: string, params: any) => {
    try {
      sentry.captureMessage(event);
    } catch (error) {
      if (printError) {
        console.log('Error: Unable to tag sentry event:', error);
      }
    }
  };
};
