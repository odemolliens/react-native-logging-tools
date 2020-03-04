export const createSentryLogger = (Sentry: any, config: any) => {
  Sentry.init({ dsn: config.dsn });
  // @ts-ignore
  return (event: string, params: any = {}) => {
    Sentry.captureMessage(event);
  };
};
