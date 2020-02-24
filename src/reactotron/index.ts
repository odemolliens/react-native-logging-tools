import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

export const setupReactotron = (appName: string) =>
  Reactotron.configure({ name: appName })
    .use(reactotronRedux())
    .useReactNative()
    .connect();
