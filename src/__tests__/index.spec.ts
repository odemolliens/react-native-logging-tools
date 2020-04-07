import initLogging, {
  createSentryLogger,
  createFirebaseLogger,
  setupReactotronWithRedux,
  setupReactotron,
  logEvent,
} from '../index';

describe('Firebasetions test suite', () => {
  const Firebase = {
    logEvent: jest.fn(),
  };
  const Sentry = {
    init: jest.fn(),
    captureMessage: jest.fn(),
  };
  const AsyncStorage = jest.fn();
  const reactotronRedux = jest.fn();
  const Reactotron = {
    configure: () => Reactotron,
    setAsyncStorageHandler: () => Reactotron,
    useReactNative: () => Reactotron,
    use: () => Reactotron,
    connect: () => Reactotron,
    clear: () => Reactotron,
    createEnhancer: () => Reactotron,
  };

  it('should init properly', () => {
    initLogging({}, []);
  });

  it('should init properly', () => {
    // @ts-ignore
    initLogging({}, [{}]);
  });

  it('should init properly with bad initialization', () => {
    initLogging({ Reactotron, reactotronRedux, AsyncStorage }, [
      createFirebaseLogger({}),
      createSentryLogger({ init: jest.fn }, { dsn: 'dsn' }),
    ]);
  });

  it('should init properly with loggers', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(Firebase),
      createSentryLogger(Sentry, { dsn: 'dsn' }),
    ]);
  });

  it('should init properly with sentry', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(Firebase),
      createSentryLogger(Sentry, { dsn: 'dsn' }),
    ]);
  });

  it('should init properly and log', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(Firebase),
      createSentryLogger(Sentry, { dsn: 'dsn' }),
    ]);
    logEvent('event', { key: 'value' });
  });

  it('should init properly and log without param', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(Firebase),
      createSentryLogger(Sentry, { dsn: 'dsn' }),
    ]);
    logEvent('event');
  });

  it('should init properly and setup reactotron', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(Firebase),
      createSentryLogger(Sentry, { dsn: 'dsn' }),
    ]);
    setupReactotron('app_name');
  });

  it('should init properly and setup reactotron and redux', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(Firebase),
      createSentryLogger(Sentry, { dsn: 'dsn' }),
    ]);
    setupReactotronWithRedux('app_name');
  });
});
