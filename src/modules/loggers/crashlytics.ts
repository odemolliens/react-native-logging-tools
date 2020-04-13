export const createCrashlyticsLogger = (crashlytics: any, printError: boolean = false) => (
  event: string,
  params: any,
) => {
  try {
    crashlytics.setAttributes(params);
    crashlytics.recordError(new Error(event));
  } catch (error) {
    if (printError) {
      console.log('Error: Unable to tag firebase crashlytics event:', error);
    }
  }
};
