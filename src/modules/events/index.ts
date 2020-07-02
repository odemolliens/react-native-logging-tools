import {isSensitiveBuild, loggers, recordErrors} from '../init';

export function logEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  if (!isSensitiveBuild || !sensitiveData) {
    for (const logger of loggers) {
      logger(event, params);
    }
  }
}

export function logWarningEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  logEvent(`W/ ${event}`, params, sensitiveData);
}

export function logDebugEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  logEvent(`D/ ${event}`, params, sensitiveData);
}

export function logNetworkEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  logEvent(`N/ ${event}`, params, sensitiveData);
}

export function logErrorEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  logEvent(`E/ ${event}`, params, sensitiveData);
}

export function recordError(event: string, params: any = {}) {
  for (const record of recordErrors) {
    record(event, params);
  }
}
