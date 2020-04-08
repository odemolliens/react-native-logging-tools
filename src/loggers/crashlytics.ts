export const createCrashlyticsLogger = (crashlytics: any) => (event: string, params: any) => {
  try {
    crashlytics.setAttributes(params);
    crashlytics.recordError(new Error(event));
  } catch (error) {
    console.log('Error: Unable to tag firebase crashlytics event:', error);
  }
};
