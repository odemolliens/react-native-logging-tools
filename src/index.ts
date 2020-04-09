import { reactotron, reactotronWithRedux } from './reactotron';
import { createFirebaseLogger, createSentryLogger, createCrashlyticsLogger } from './loggers';
import { IInit, IReactotron } from './model';
import { isFunction } from './helpers/functions';
import setupExceptionHandler from './exceptionHandler';

let Reactotron: any;
let reactotronRedux: any;
let AsyncStorage: any;

const loggers: Function[] = [];
const recordErrors: Function[] = [];

export default function initialization(init: IInit): void {
  if (init.config) {
    if (init.config.Reactotron) {
      Reactotron = init.config.Reactotron;
    }
    if (init.config.reactotronRedux) {
      reactotronRedux = init.config.reactotronRedux;
    }
    if (init.config.AsyncStorage) {
      AsyncStorage = init.config.AsyncStorage;
    }
    if (init.config.reportJSErrors === true) {
      setupExceptionHandler();
    }
  }

  if (init.analytics) {
    for (const logger of init.analytics) {
      if (isFunction(logger)) {
        loggers.push(logger);
      }
    }
  }

  if (init.errorReporters) {
    for (const reporter of init.errorReporters) {
      if (isFunction(reporter)) {
        recordErrors.push(reporter);
      }
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
