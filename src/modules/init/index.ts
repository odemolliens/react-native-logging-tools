import { IInit } from '../../model';
import setupExceptionHandler from '../../exceptionHandler';
import { isFunction } from '../../helpers/functions';

export let Reactotron: any;
export let reactotronRedux: any;
export let AsyncStorage: any;
export let isSensitiveBuild: boolean;

export const loggers: Function[] = [];
export const recordErrors: Function[] = [];

export function init(initConfig: IInit): void {
  if (initConfig.config) {
    if (initConfig.config.Reactotron) {
      Reactotron = initConfig.config.Reactotron;
    }
    if (initConfig.config.reactotronRedux) {
      reactotronRedux = initConfig.config.reactotronRedux;
    }
    if (initConfig.config.AsyncStorage) {
      AsyncStorage = initConfig.config.AsyncStorage;
    }
    if (initConfig.config.reportJSErrors === true) {
      setupExceptionHandler();
    }
    if (initConfig.config.isSensitiveBuild === true) {
      isSensitiveBuild = initConfig.config.isSensitiveBuild;
    }
  }

  if (initConfig.analytics) {
    for (const logger of initConfig.analytics) {
      if (isFunction(logger)) {
        loggers.push(logger);
      }
    }
  }

  if (initConfig.errorReporters) {
    for (const reporter of initConfig.errorReporters) {
      if (isFunction(reporter)) {
        recordErrors.push(reporter);
      }
    }
  }
}
