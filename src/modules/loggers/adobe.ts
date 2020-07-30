import { excludeLogs, sendEventToFlipper } from '../init';

export const createAdobeLogger = (ACPAnalytics: any, ACPCore: any, printLogs: boolean = false) => {
  ACPAnalytics.registerExtension();
  sendEventToFlipper('adobe', 'Adobe connected successfully');
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.adobe && excludeLogs.adobe.includes(eventType)) {
      return;
    }
    try {
      ACPCore.trackAction(event, params);
      sendEventToFlipper('adobe', event, params);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag adobe event:', error);
      }
      sendEventToFlipper('adobe', event, params, error);
    }
  };
};
