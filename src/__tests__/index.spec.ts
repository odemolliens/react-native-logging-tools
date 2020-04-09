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
    initLogging({ config: {}, analytics: [], errorReporters: [] });
  });

  it('should init properly with bad firebase initialization', () => {
    initLogging({
      analytics: [createFirebaseLogger({}), createSentryLogger(sentry, { dsn: 'dsn' })],
      errorReporters: [createCrashlyticsLogger({})],
    });
  });

  it('should init properly with bad sentry initialization', () => {
    initLogging({
      analytics: [createFirebaseLogger(analytics), createSentryLogger({ init: jest.fn() }, { dsn: 'dsn' })],
    });
    logEvent('event', { key: 'value' });
  });

  it('should init properly and log event', () => {
    initLogging({
      analytics: [createFirebaseLogger(analytics), createSentryLogger(sentry, { dsn: 'dsn' })],
    });
    logEvent('event', { key: 'value' });
  });

  it('should init properly and log without param', () => {
    initLogging({
      analytics: [createFirebaseLogger(analytics), createSentryLogger(sentry, { dsn: 'dsn' })],
    });
    logEvent('event');
  });

  it('should init properly and log with wrong data', () => {
    // @ts-ignore
    initLogging({ analytics: [{}] });
    logEvent('event');
  });

  it('should init properly and record error', () => {
    initLogging({ config: { reportJSErrors: true }, errorReporters: [createCrashlyticsLogger(crashlytics)] });
    recordError('error', { key: 'value' });
  });

  it('should init properly and record error without param', () => {
    initLogging({ config: { reportJSErrors: true }, errorReporters: [createCrashlyticsLogger(crashlytics)] });
    recordError('error');
  });

  it('should init properly and record error with wrong data', () => {
    // @ts-ignore
    initLogging({ config: { reportJSErrors: true }, errorReporters: [{}] });
    recordError('error');
  });

  it('should init properly and setup reactotron', () => {
    initLogging({ config: { Reactotron, AsyncStorage } });
    setupReactotron('app_name');
  });

  it('should init properly and setup reactotron and redux', () => {
    initLogging({ config: { Reactotron, reactotronRedux, AsyncStorage } });
    setupReactotronWithRedux('app_name');
  });
});
