import { IReactotron } from '../model/config';

export function reactotron(Reactotron: any, AsyncStorage: any, appName: string): IReactotron {
  return Reactotron.configure({ name: appName }).setAsyncStorageHandler(AsyncStorage).useReactNative().connect();
}

export function reactotronWithRedux(
  Reactotron: any,
  reactotronRedux: any,
  AsyncStorage: any,
  appName: string,
): IReactotron {
  return Reactotron.configure({ name: appName })
    .setAsyncStorageHandler(AsyncStorage)
    .use(reactotronRedux())
    .useReactNative()
    .connect();
}
