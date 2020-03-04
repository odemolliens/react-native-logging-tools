import { reactotron, reactotronWithRedux } from './reactotron';
import { createFirebaseLogger, createSentryLogger } from './loggers';
import { IConfig, IReactotron } from './model/config';

let Reactotron: any;
let reactotronRedux: any;

let loggers: Array<any>;

export default function init(config: IConfig, functionsList: Array<any>) {
  if (config.Reactotron) {
    Reactotron = config.Reactotron;
  }
  if (config.reactotronRedux) {
    reactotronRedux = config.reactotronRedux;
  }

  loggers = functionsList;
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
