import { IReactotron } from '../../model';
import { AsyncStorage, Reactotron } from '../init';

export function emptyFunction() {
  return {};
}

export function reactotron(
  ReactotronModule: any,
  asyncStorage: any,
  config?: any,
  plugins?: Array<Function>,
): IReactotron {
  return ReactotronModule.configure(config || { name: 'App' })
    .setAsyncStorageHandler(asyncStorage)
    .useReactNative()
    .use(plugins && plugins.length > 0 ? plugins[0] : emptyFunction)
    .use(plugins && plugins.length > 1 ? plugins[1] : emptyFunction)
    .use(plugins && plugins.length > 2 ? plugins[2] : emptyFunction)
    .connect();
}

export function setupReactotron(config?: any, plugins?: Array<Function>): IReactotron {
  return reactotron(Reactotron, AsyncStorage, config, plugins);
}
