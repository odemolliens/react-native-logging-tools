import { init, setupReactotron } from '../../index';
import { emptyFunction } from '../reactotron';

describe('reactotron test suite', () => {
  const AsyncStorage = jest.fn();
  const reactotronRedux = jest.fn();
  const Reactotron = {
    configure: () => Reactotron,
    setAsyncStorageHandler: () => Reactotron,
    useReactNative: () => Reactotron,
    use: () => Reactotron,
    connect: () => Reactotron,
    createEnhancer: () => Reactotron,
  };

  it('should init properly and setup reactotron', () => {
    init({ config: { Reactotron, AsyncStorage } });
    emptyFunction();
    setupReactotron();
  });

  it('should init properly and setup reactotron and redux', () => {
    init({ config: { Reactotron, AsyncStorage } });
    setupReactotron(undefined, [reactotronRedux()]);
    setupReactotron({}, [reactotronRedux(), reactotronRedux(), reactotronRedux()]);
  });
});
