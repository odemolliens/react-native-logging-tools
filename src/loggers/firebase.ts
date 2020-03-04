export const createFirebaseLogger = (Firebase: any) => (event: string, params: any = {}) => {
  try {
    Firebase.logEvent(event, params);
  } catch (error) {
    console.log('Error: Unable to tag firebase analytics event:', error);
  }
};
