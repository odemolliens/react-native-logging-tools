import {
  init,
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
    init({});
  });

  it('should init not properly', () => {
    init({ config: {}, analytics: [], errorReporters: [] });
  });

  it('should init not properly 2', () => {
    // @ts-ignore
    init({ config: { reportJSErrors: true }, analytics: [{}], errorReporters: [{}] });
  });

  it('should init with wrong datas', () => {
    init({
      analytics: [createFirebaseLogger({}, true), createSentryLogger({ init: jest.fn() }, { dsn: 'dsn' }, true)],
      errorReporters: [createCrashlyticsLogger({}, true)],
    });
    logEvent('event', { key: 'value' });
    recordError('error', { key: 'value' });
  });

  it('should init with wrong datas', () => {
    init({
      analytics: [createFirebaseLogger({}), createSentryLogger({ init: jest.fn() }, { dsn: 'dsn' })],
      errorReporters: [createCrashlyticsLogger({})],
    });
    logEvent('event', { key: 'value' });
    recordError('error', { key: 'value' });
  });

  // Firebase & Sentry

  it('should init properly and log event', () => {
    init({
      analytics: [createFirebaseLogger(analytics), createSentryLogger(sentry, { dsn: 'dsn' })],
    });
    logEvent('event', { key: 'value' });
  });

  it('should init properly and log without param', () => {
    init({
      analytics: [createFirebaseLogger(analytics), createSentryLogger(sentry, { dsn: 'dsn' })],
    });
    logEvent('event');
  });

  // Crashlytics

  it('should init properly and record error', () => {
    init({ config: { reportJSErrors: true }, errorReporters: [createCrashlyticsLogger(crashlytics)] });
    recordError('error', { key: 'value' });
  });

  it('should init properly and record error without param', () => {
    init({ config: { reportJSErrors: true }, errorReporters: [createCrashlyticsLogger(crashlytics)] });
    recordError('error');
  });

  it('should init properly and setup reactotron', () => {
    init({ config: { Reactotron, AsyncStorage } });
    setupReactotron('app_name');
  });

  it('should init properly and setup reactotron and redux', () => {
    init({ config: { Reactotron, reactotronRedux, AsyncStorage } });
    setupReactotronWithRedux('app_name');
  });
});
