import { reactotron, reactotronWithRedux } from './reactotron';
import { createFirebaseLogger, createSentryLogger } from './loggers';
import { IConfig, IReactotron } from './model/config';

let Reactotron: any;
let reactotronRedux: any;

const loggers: Array<Function> = [];

export default function init(config: IConfig, createdLoggers: Array<Function>) {
  if (config.Reactotron) {
    Reactotron = config.Reactotron;
  }
  if (config.reactotronRedux) {
    reactotronRedux = config.reactotronRedux;
  }

  for (const logger of createdLoggers) {
    if (isFunction(logger)) {
      loggers.push(logger);
    }
  }
}

export function setupReactotron(appName: string): IReactotron {
  return reactotron(Reactotron, appName);
}

export function setupReactotronWithRedux(appName: string): IReactotron {
  return reactotronWithRedux(Reactotron, reactotronRedux, appName);
}

export function logEvent(event: string, params: any = {}) {
  for (const logger of loggers) {
    logger(event, params);
  }
}

export { createFirebaseLogger, createSentryLogger };
