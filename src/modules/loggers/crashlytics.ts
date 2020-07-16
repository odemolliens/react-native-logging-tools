import { excludeLogs } from '../init';

export const createCrashlyticsLogger = (crashlytics: any, printLogs: boolean = false) => (
  event: string,
  params: any,
  eventType: number,
) => {
  if (eventType !== -1 && excludeLogs && excludeLogs.crashlytics && excludeLogs.crashlytics.includes(eventType)) {
    return;
  }
  try {
    crashlytics.setAttributes(params);
    crashlytics.recordError(new Error(event));
  } catch (error) {
    if (printLogs) {
      console.log('Error: Unable to tag firebase crashlytics event:', error);
    }
  }
};
