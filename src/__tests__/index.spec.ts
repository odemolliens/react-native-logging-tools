import {
  init,
  createSentryLogger,
  createFirebaseLogger,
  createAdobeLogger,
  createTealiumLogger,
  setupReactotron,
  logEvent,
  createCrashlyticsLogger,
  recordError,
  logWarningEvent,
  logDebugEvent,
  logNetworkEvent,
  logErrorEvent,
  createInstabugLogger,
} from '../index';
import * as Init from '../modules/init';
import { emptyFunction } from '../modules/reactotron';
import { ITealium } from '../model/tealium';

describe('index test suite', () => {
  const analytics = {
    logEvent: jest.fn(),
  };
  const ACPAnalytics = {
    registerExtension: jest.fn(),
  };
  const ACPCore = {
    trackState: jest.fn(),
    trackAction: jest.fn(),
  };
  const instabug = {
    startWithToken: jest.fn(),
    logUserEventWithName: jest.fn(),
    invocationEvent: {
      shake: jest.fn(),
    },
  };
  const instabugWrong = {
    startWithToken: jest.fn(),
    invocationEvent: {
      shake: jest.fn(),
    },
  };
  const crashlytics = {
    recordError: jest.fn(),
    setAttributes: jest.fn(),
  };
  const sentry = {
    init: jest.fn(),
    captureMessage: jest.fn(),
  };
  const Tealium = {
    initialize: jest.fn(),
    trackEvent: jest.fn(),
  };
  const configTealium: ITealium = { account: 'accountName', profile: 'profileName', environment: 'environment' };

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

  it('should init properly', () => {
    init({});
  });

  it('should init not properly', () => {
    init({ config: {}, analytics: [], errorReporters: [] });
  });

  it('should init not properly 2', () => {
    // @ts-ignore
    init({ config: { reportJSErrors: true, isSensitiveBuild: true }, analytics: [{}], errorReporters: [{}] });
  });

  // Firebase & Sentry

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

  it('should init properly and log event', () => {
    givenSetSensitiveBuild(true);
    init({
      analytics: [createFirebaseLogger(analytics), createSentryLogger(sentry, { dsn: 'dsn' })],
    });
    logEvent('event', { key: 'value' }, true);
  });

  it('should init properly and log without param', () => {
    givenSetSensitiveBuild(false);
    init({
      analytics: [createFirebaseLogger(analytics), createSentryLogger(sentry, { dsn: 'dsn' })],
    });
    logEvent('event');
    logWarningEvent('event');
    logDebugEvent('event');
    logNetworkEvent('event');
    logErrorEvent('event');
  });

  // Tealium & Adobe

  it('should init with wrong datas', () => {
    init({
      analytics: [
        createTealiumLogger({ initialize: jest.fn() }, configTealium, true),
        createAdobeLogger({ registerExtension: jest.fn() }, {}, true),
      ],
      errorReporters: [createCrashlyticsLogger({}, true)],
    });
    logEvent('event', { key: 'value' });
    recordError('error', { key: 'value' });
  });

  it('should init with wrong datas', () => {
    init({
      analytics: [
        createTealiumLogger({ initialize: jest.fn() }, configTealium),
        createAdobeLogger({ registerExtension: jest.fn() }, {}),
      ],
      errorReporters: [createCrashlyticsLogger({})],
    });
    logEvent('event', { key: 'value' });
    recordError('error', { key: 'value' });
  });

  // Firebase & Sentry & Adobe & Tealium

  it('should init properly and log event', () => {
    givenSetSensitiveBuild(true);
    init({
      analytics: [
        createTealiumLogger(Tealium, configTealium),
        createAdobeLogger(ACPAnalytics, ACPCore),
      ],
    });
    logEvent('event', { key: 'value' }, true);
  });

  it('should init properly and log without param', () => {
    givenSetSensitiveBuild(false);
    init({
      analytics: [
        createTealiumLogger(Tealium, configTealium),
        createAdobeLogger(ACPAnalytics, ACPCore),
      ],
    });
    logEvent('event');
    logWarningEvent('event');
    logDebugEvent('event');
    logNetworkEvent('event');
    logErrorEvent('event');
  });

  // Instabug

  it('should init properly and log event', () => {
    init({
      analytics: [createInstabugLogger(instabug, { invocationEvent: 'shake', token: 'token' })],
    });
    logEvent('event', { key: 'value' }, true);
  });

  it('should init properly and log event without invocationEvent', () => {
    init({
      analytics: [createInstabugLogger(instabug, { token: 'token' })],
    });
    logEvent('event', { key: 'value' }, true);
  });

  it('should init not properly', () => {
    init({
      analytics: [createInstabugLogger(instabugWrong, { token: 'token' }, true)],
    });
    logEvent('event', { key: 'value' }, true);
  });

  it('should init not properly', () => {
    init({
      analytics: [createInstabugLogger(instabugWrong, { token: 'token' })],
    });
    logEvent('event', { key: 'value' }, true);
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
    emptyFunction();
    setupReactotron();
  });

  it('should init properly and setup reactotron and redux', () => {
    init({ config: { Reactotron, AsyncStorage } });
    setupReactotron(undefined, [reactotronRedux()]);
    setupReactotron({}, [reactotronRedux(), reactotronRedux(), reactotronRedux()]);
  });

  function givenSetSensitiveBuild(isSensitive: boolean = true) {
    // @ts-ignore
    Init.isSensitiveBuild = isSensitive;
  }
});
