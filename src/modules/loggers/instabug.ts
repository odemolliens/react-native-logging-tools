import { IInstabug } from '../../model/instabug';

export const createInstabugLogger = (instabug: any, config: IInstabug, printError: boolean = false) => {
  instabug.startWithToken(config.token, [config.invocationEvent || instabug.invocationEvent.shake]);
  // @ts-ignore
  return (event: string, params: any) => {
    try {
      instabug.logUserEventWithName(event);
    } catch (error) {
      if (printError) {
        console.log('Error: Unable to tag instabug event:', error);
      }
    }
  };
};
