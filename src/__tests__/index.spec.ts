import initLogging, {
  createSentryLogger,
  createFirebaseLogger,
  setupReactotronWithRedux,
  setupReactotron,
  logEvent,
  createCrashlyticsLogger,
  recordError,
} from '../index';

describe('index test suite', () => {
  const analytics = {
    logEvent: jest.fn(),
  };
  const crashlytics = {
    recordError: jest.fn(),
    setAttributes: jest.fn(),
  };
  const sentry = {
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
    initLogging({});
  });

  it('should init properly', () => {
    initLogging({}, []);
  });

  it('should init properly', () => {
    // @ts-ignore
    initLogging({}, [{}], [{}]);
  });

  it('should init properly with bad initialization', () => {
    initLogging(
      { Reactotron, reactotronRedux, AsyncStorage },
      [createFirebaseLogger({}), createSentryLogger({ init: jest.fn }, { dsn: 'dsn' })],
      [createCrashlyticsLogger({})],
    );
  });

  it('should init properly loggers and errors', () => {
    initLogging(
      { Reactotron, reactotronRedux },
      [createFirebaseLogger(analytics), createSentryLogger(sentry, { dsn: 'dsn' })],
      [createCrashlyticsLogger(crashlytics)],
    );
  });

  it('should init properly with sentry', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(analytics),
      createSentryLogger(sentry, { dsn: 'dsn' }),
    ]);
  });

  it('should init properly and log', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(analytics),
      createSentryLogger(sentry, { dsn: 'dsn' }),
    ]);
    logEvent('event', { key: 'value' });
  });

  it('should init properly and log', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(analytics),
      createSentryLogger(sentry, { dsn: 'dsn' }),
    ]);
    logEvent('event', { key: 'value' });
  });

  it('should init properly and log without param', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(analytics),
      createSentryLogger(sentry, { dsn: 'dsn' }),
    ]);
    logEvent('event');
  });

  it('should init properly and record error', () => {
    initLogging({ Reactotron, reactotronRedux, reportJSErrors: true }, [], [createCrashlyticsLogger(crashlytics)]);
    recordError('error', { key: 'value' });
  });

  it('should init properly and record error without param', () => {
    initLogging({ Reactotron, reactotronRedux }, [], [createCrashlyticsLogger(crashlytics)]);
    recordError('error');
  });

  it('should init properly and setup reactotron', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(analytics),
      createSentryLogger(sentry, { dsn: 'dsn' }),
    ]);
    setupReactotron('app_name');
  });

  it('should init properly and setup reactotron and redux', () => {
    initLogging({ Reactotron, reactotronRedux }, [
      createFirebaseLogger(analytics),
      createCrashlyticsLogger(crashlytics),
      createSentryLogger(sentry, { dsn: 'dsn' }),
    ]);
    setupReactotronWithRedux('app_name');
  });
});
