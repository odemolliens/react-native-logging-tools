import { excludeLogs } from '../init';

export const createFirebaseLogger = (analytics: any, printLogs: boolean = false) => (
  event: string,
  params: any,
  eventType: number,
) => {
  if (eventType !== -1 && excludeLogs && excludeLogs.firebase && excludeLogs.firebase.includes(eventType)) {
    return;
  }
  try {
    analytics.logEvent(event, params);
  } catch (error) {
    if (printLogs) {
      console.log('Error: Unable to tag firebase analytics event:', error);
    }
  }
};
