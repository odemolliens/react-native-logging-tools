export const createSentryLogger = (Sentry: any, config: any) => {
  Sentry.init({ dsn: config.dsn });
  // @ts-ignore
  return (event: string, params: any) => {
    try {
      Sentry.captureMessage(event);
    } catch (error) {
      console.log('Error: Unable to tag sentry event:', error);
    }
  };
};
