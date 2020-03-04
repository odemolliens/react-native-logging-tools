export const createFirebaseLogger = (Firebase: any) => (event: string, params: any = {}) => {
  Firebase.logEvent(event, params);
};
