import { reactotron, reactotronWithRedux } from './reactotron';
import { createFirebaseLogger, createSentryLogger } from './loggers';
import { IConfig, IReactotron } from './model/config';
import { isFunction } from './helpers/functions';

let Reactotron: any;
let reactotronRedux: any;
let asyncStorage: any;

const loggers: Function[] = [];

export default function init(config: IConfig, createdLoggers: Function[]): void {
  if (config.Reactotron) {
    Reactotron = config.Reactotron;
  }
  if (config.reactotronRedux) {
    reactotronRedux = config.reactotronRedux;
  }
  if (config.asyncStorage) {
    asyncStorage = config.asyncStorage;
  }

  for (const logger of createdLoggers) {
    if (isFunction(logger)) {
      loggers.push(logger);
    }
  }
}

export function setupReactotron(appName: string): IReactotron {
  return reactotron(Reactotron, asyncStorage, appName);
}

export function setupReactotronWithRedux(appName: string): IReactotron {
  return reactotronWithRedux(Reactotron, asyncStorage, reactotronRedux, appName);
}

export function logEvent(event: string, params: any = {}) {
  for (const logger of loggers) {
    logger(event, params);
  }
}

export { createFirebaseLogger, createSentryLogger };
