import { ITealium } from '../../model/tealium';
import {excludeLogs, sendEventToFlipper} from '../init';

export const createTealiumLogger = (Tealium: any, config: ITealium, printLogs: boolean = false) => {
  Tealium.initialize(
    config.account,
    config.profile,
    config.environment,
    config.iosDatasource,
    config.androidDatasource,
    config.instance,
    config.isLifecycleEnabled,
  );
  sendEventToFlipper('tealium', 'Tealium connected successfully');
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.tealium && excludeLogs.tealium.includes(eventType)) {
      return;
    }
    try {
      Tealium.trackEvent(event, params);
      sendEventToFlipper('tealium', event, params);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag tealium event:', error);
      }
      sendEventToFlipper('tealium', event, params, error);
    }
  };
};
