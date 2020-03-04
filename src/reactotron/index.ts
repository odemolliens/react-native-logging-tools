import { IReactotron } from '../model/config';

export function reactotron(Reactotron: any, appName: string): IReactotron {
  return Reactotron.configure({ name: appName })
    .useReactNative()
    .connect();
}

export function reactotronWithRedux(Reactotron: any, reactotronRedux: any, appName: string): IReactotron {
  return Reactotron.configure({ name: appName })
    .use(reactotronRedux())
    .useReactNative()
    .connect();
}
