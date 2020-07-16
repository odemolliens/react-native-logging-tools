import { IInstabug } from '../../model/instabug';
import { excludeLogs } from '../init';

export const createInstabugLogger = (instabug: any, config: IInstabug, printLogs: boolean = false) => {
  instabug.startWithToken(config.token, [config.invocationEvent || instabug.invocationEvent.shake]);
  // @ts-ignore
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.instabug && excludeLogs.instabug.includes(eventType)) {
      return;
    }
    try {
      instabug.logUserEventWithName(event);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag instabug event:', error);
      }
    }
  };
};
