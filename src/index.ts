import { reactotron, reactotronWithRedux } from './reactotron';
import { createFirebaseLogger, createSentryLogger, createCrashlyticsLogger } from './loggers';
import { IConfig, IReactotron } from './model/config';
import { isFunction } from './helpers/functions';

let Reactotron: any;
let reactotronRedux: any;
let AsyncStorage: any;

const loggers: Function[] = [];
const recordErrors: Function[] = [];

export default function init(config: IConfig, createdLoggers: Function[] = [], createdErrors: Function[] = []): void {
  if (config.Reactotron) {
    Reactotron = config.Reactotron;
  }
  if (config.reactotronRedux) {
    reactotronRedux = config.reactotronRedux;
  }
  if (config.AsyncStorage) {
    AsyncStorage = config.AsyncStorage;
  }

  for (const logger of createdLoggers) {
    if (isFunction(logger)) {
      loggers.push(logger);
    }
  }

  for (const logger of createdErrors) {
    if (isFunction(logger)) {
      recordErrors.push(logger);
    }
  }
}

export function setupReactotron(appName: string): IReactotron {
  return reactotron(Reactotron, AsyncStorage, appName);
}

export function setupReactotronWithRedux(appName: string): IReactotron {
  return reactotronWithRedux(Reactotron, reactotronRedux, AsyncStorage, appName);
}

export function logEvent(event: string, params: any = {}) {
  for (const logger of loggers) {
    logger(event, params);
  }
}

export function recordError(event: string, params: any = {}) {
  for (const record of recordErrors) {
    record(event, params);
  }
}

export { createFirebaseLogger, createSentryLogger, createCrashlyticsLogger };
