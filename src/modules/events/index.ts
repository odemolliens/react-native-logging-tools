import { loggers, recordErrors } from '../init';

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
