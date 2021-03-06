import { IInit } from '../../model';
import setupExceptionHandler from '../../exceptionHandler';
import { isFunction } from '../../helpers/functions';
import { IExcludeLogs } from '../../model/config';
import FlipperConnectionManager from '../../flipper';

export const DEBUG_LOG: number = 0;
export const WARNING_LOG: number = 1;
export const NETWORK_LOG: number = 2;
export const ERROR_LOG: number = 3;

export let flipperConnectionManager: any;
export let Reactotron: any;
export let addPlugin: ((config: any) => void) | undefined;
export let AsyncStorage: any;
export let isSensitiveBuild: boolean;

export let loggers: Function[] = [];
export let recordErrors: Function[] = [];
export let excludeLogs: IExcludeLogs = {};

function clean() {
  loggers = [];
  recordErrors = [];
  flipperConnectionManager = undefined;
  addPlugin = undefined;
  Reactotron = undefined;
  AsyncStorage = undefined;
  isSensitiveBuild = false;
}

export function init(initConfig: IInit): void {
  clean();

  if (initConfig.config) {
    if (initConfig.config.useFlipperPlugin && initConfig.config.addPlugin) {
      addPlugin = initConfig.config.addPlugin;
      flipperConnectionManager = new FlipperConnectionManager();
    }
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

export function sendEventToFlipper(service: string, event: string, params?: any, error?: any) {
  if (flipperConnectionManager) {
    flipperConnectionManager.send(service, event, params, error);
  }
}
