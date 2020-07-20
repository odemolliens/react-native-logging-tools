import { IReactotron } from '../../model';
import { AsyncStorage, Reactotron } from '../init';

export function emptyFunction() {
  return {};
}

function reactotron(ReactotronModule: any, asyncStorage: any, config?: any, plugins?: Array<Function>): IReactotron {
  return ReactotronModule.configure(config || { name: 'App' })
    .setAsyncStorageHandler(asyncStorage)
    .useReactNative()
    .use(plugins && plugins.length > 0 ? plugins[0] : emptyFunction)
    .use(plugins && plugins.length > 1 ? plugins[1] : emptyFunction)
    .use(plugins && plugins.length > 2 ? plugins[2] : emptyFunction)
    .use(plugins && plugins.length > 3 ? plugins[3] : emptyFunction)
    .use(plugins && plugins.length > 4 ? plugins[4] : emptyFunction)
    .connect();
}

export function setupReactotron(reactotronConfig?: any, plugins?: Array<Function>): IReactotron {
  return reactotron(Reactotron, AsyncStorage, reactotronConfig, plugins);
}
