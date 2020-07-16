import { IInit } from '../../model';
import setupExceptionHandler from '../../exceptionHandler';
import { isFunction } from '../../helpers/functions';
import { IExcludeLogs } from '../../model/config';

export const DEBUG_LOG: number = 0;
export const WARNING_LOG: number = 1;
export const NETWORK_LOG: number = 2;
export const ERROR_LOG: number = 3;

export let Reactotron: any;
export let AsyncStorage: any;
export let isSensitiveBuild: boolean;

export const loggers: Function[] = [];
export const recordErrors: Function[] = [];
export let excludeLogs: IExcludeLogs = {};

export function init(initConfig: IInit): void {
  if (initConfig.config) {
    if (initConfig.config.excludeLogs) {
      excludeLogs = initConfig.config.excludeLogs;
    }
    if (initConfig.config.Reactotron) {
      Reactotron = initConfig.config.Reactotron;
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
