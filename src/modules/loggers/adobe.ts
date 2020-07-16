import { excludeLogs } from '../init';

export const createAdobeLogger = (ACPAnalytics: any, ACPCore: any, printLogs: boolean = false) => {
  ACPAnalytics.registerExtension();
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.adobe && excludeLogs.adobe.includes(eventType)) {
      return;
    }
    try {
      ACPCore.trackAction(event, params);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag adobe event:', error);
      }
    }
  };
};
