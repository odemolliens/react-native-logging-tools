export const createSentryLogger = (sentry: any, config: any) => {
  sentry.init({ dsn: config.dsn });
  // @ts-ignore
  return (event: string, params: any) => {
    try {
      sentry.captureMessage(event);
    } catch (error) {
      console.log('Error: Unable to tag sentry event:', error);
    }
  };
};
