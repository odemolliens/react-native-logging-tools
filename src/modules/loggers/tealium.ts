import { ITealium } from '../../model/tealium';
import { excludeLogs } from '../init';

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
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.tealium && excludeLogs.tealium.includes(eventType)) {
      return;
    }
    try {
      Tealium.trackEvent(event, params);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag tealium event:', error);
      }
    }
  };
};
