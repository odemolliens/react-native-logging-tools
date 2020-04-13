export const createFirebaseLogger = (analytics: any, printError: boolean = false) => (event: string, params: any) => {
  try {
    analytics.logEvent(event, params);
  } catch (error) {
    if (printError) {
      console.log('Error: Unable to tag firebase analytics event:', error);
    }
  }
};
