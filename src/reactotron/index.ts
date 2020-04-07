import { IReactotron } from '../model/config';

export function reactotron(Reactotron: any, asyncStorage: any, appName: string): IReactotron {
  return Reactotron.configure({ name: appName })
    .setAsyncStorageHandler(asyncStorage)
    .useReactNative()
    .connect();
}

export function reactotronWithRedux(Reactotron: any, reactotronRedux: any, asyncStorage: any, appName: string): IReactotron {
  return Reactotron.configure({ name: appName })
    .setAsyncStorageHandler(asyncStorage)
    .use(reactotronRedux())
    .useReactNative()
    .connect();
}
