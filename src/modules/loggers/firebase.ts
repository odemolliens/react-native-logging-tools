import {excludeLogs, sendEventToFlipper} from '../init';

export const createFirebaseLogger = (analytics: any, printLogs: boolean = false) => {
  sendEventToFlipper('firebase', 'Firebase analytics connected successfully');
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.firebase && excludeLogs.firebase.includes(eventType)) {
      return;
    }
    try {
      analytics.logEvent(event, params);
      sendEventToFlipper('firebase', event, params);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag firebase analytics event:', error);
      }
      sendEventToFlipper('firebase', event, params, error);
    }
  };
};
