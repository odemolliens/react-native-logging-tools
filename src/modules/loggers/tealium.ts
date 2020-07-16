import { ITealium } from '../../model/tealium';

export const createTealiumLogger = (tealium: any, config: ITealium, printError: boolean = false) => {
  tealium.initialize(
    config.account,
    config.profile,
    config.environment,
    config.iosDatasource,
    config.androidDatasource,
    config.instance,
    config.isLifecycleEnabled,
  );
  return (event: string, params: any) => {
    try {
      tealium.trackEvent(event, params);
    } catch (error) {
      if (printError) {
        console.log('Error: Unable to tag tealium event:', error);
      }
    }
  };
};
