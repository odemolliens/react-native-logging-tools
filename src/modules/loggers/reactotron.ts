import { excludeLogs, sendEventToFlipper, DEBUG_LOG, WARNING_LOG, ERROR_LOG } from '../init';

export const createReactotronLogger = (reactotron: any, printLogs: boolean = false) => {
  sendEventToFlipper('reactotron', 'Reactotron connected successfully');
  // @ts-ignore
  return (event: string, params: any, eventType: number) => {
    if (eventType !== -1 && excludeLogs && excludeLogs.reactotron && excludeLogs.reactotron.includes(eventType)) {
      return;
    }
    try {
      switch (eventType) {
        case DEBUG_LOG:
          reactotron.log(event);
          break;
        case WARNING_LOG:
          reactotron.warn(event);
          break;
        case ERROR_LOG:
          reactotron.error(event);
          break;
        default:
          reactotron.log(event);
          break;
      }
      sendEventToFlipper('reactotron', event, params);
    } catch (error) {
      if (printLogs) {
        console.log('Error: Unable to tag reactotron event:', error);
      }
      sendEventToFlipper('reactotron', event, params, error);
    }
  };
};
