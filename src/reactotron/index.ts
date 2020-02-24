import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

export const setupReactotron = (appName: string, customIP: string = '') =>
  Reactotron.configure({ name: appName, host: customIP })
    .use(reactotronRedux())
    .useReactNative()
    .connect();
