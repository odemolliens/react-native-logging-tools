import {excludeLogs, sendEventToFlipper} from '../init';

export const createCrashlyticsLogger = (crashlytics: any, printLogs: boolean = false) => {
  sendEventToFlipper('crashlytics', 'Firebase crashlytics connected successfully');
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.crashlytics && excludeLogs.crashlytics.includes(eventType)) {
      return;
    }
    try {
      crashlytics.setAttributes(params);
      crashlytics.recordError(new Error(event));
      sendEventToFlipper('crashlytics', event, params);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag firebase crashlytics event:', error);
      }
      sendEventToFlipper('crashlytics', event, params, error);
    }
  };
};
