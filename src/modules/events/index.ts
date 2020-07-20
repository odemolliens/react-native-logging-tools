import { DEBUG_LOG, ERROR_LOG, isSensitiveBuild, loggers, NETWORK_LOG, recordErrors, WARNING_LOG } from '../init';

export function log(event: string, eventType: number, params: any = {}, sensitiveData: boolean = false) {
  if (!isSensitiveBuild || !sensitiveData) {
    for (const logger of loggers) {
      logger(event, params, eventType);
    }
  }
}

export function logEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  log(event, -1, params, sensitiveData);
}

export function logDebugEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  log(`D/ ${event}`, DEBUG_LOG, params, sensitiveData);
}

export function logWarningEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  log(`W/ ${event}`, WARNING_LOG, params, sensitiveData);
}

export function logNetworkEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  log(`N/ ${event}`, NETWORK_LOG, params, sensitiveData);
}

export function logErrorEvent(event: string, params: any = {}, sensitiveData: boolean = false) {
  log(`E/ ${event}`, ERROR_LOG, params, sensitiveData);
}

export function recordError(event: string, params: any = {}) {
  for (const record of recordErrors) {
    record(event, params);
  }
}
