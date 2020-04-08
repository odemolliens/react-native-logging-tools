export const createFirebaseLogger = (analytics: any) => (event: string, params: any) => {
  try {
    analytics.logEvent(event, params);
  } catch (error) {
    console.log('Error: Unable to tag firebase analytics event:', error);
  }
};
