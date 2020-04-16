import { IReactotron } from '../../model';
import { AsyncStorage, Reactotron, reactotronRedux } from '../init';

export function reactotron(ReactotronModule: any, asyncStorage: any, appName: string): IReactotron {
  return ReactotronModule.configure({ name: appName }).setAsyncStorageHandler(asyncStorage).useReactNative().connect();
}

export function reactotronWithRedux(
  ReactotronModule: any,
  ReactotronRedux: any,
  asyncStorage: any,
  appName: string,
): IReactotron {
  return ReactotronModule.configure({ name: appName })
    .setAsyncStorageHandler(asyncStorage)
    .use(ReactotronRedux())
    .useReactNative()
    .connect();
}

export function setupReactotron(appName: string): IReactotron {
  return reactotron(Reactotron, AsyncStorage, appName);
}

export function setupReactotronWithRedux(appName: string): IReactotron {
  return reactotronWithRedux(Reactotron, reactotronRedux, AsyncStorage, appName);
}
