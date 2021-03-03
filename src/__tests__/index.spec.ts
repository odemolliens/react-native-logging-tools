import {
  createAdobeLogger,
  createCrashlyticsLogger,
  createFirebaseLogger,
  createInstabugLogger,
  createSentryLogger,
  createTealiumLogger,
  DEBUG_LOG,
  init,
  logDebugEvent,
  logErrorEvent,
  logEvent,
  logNetworkEvent,
  logWarningEvent,
  recordError,
} from '../index';
import * as Init from '../modules/init';
import {Collectors, Dispatchers, ITealiumConfig} from '../model/tealium';
import {log} from '../modules/events';

describe('index test suite', () => {
  const useFlipperPlugin: boolean = true;
  const addPlugin = jest.fn();
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
  const configTealium: ITealiumConfig = {
    collectors: [Collectors.Connectivity, Collectors.DeviceData],
    dataSource: 'datasssource',
    dispatchers: [Dispatchers.RemoteCommands, Dispatchers.Collect],
    account: 'accountName',
    profile: 'profileName',
    environment: 'dev',
  };

  const Reactotron = {
    configure: () => Reactotron,
    setAsyncStorageHandler: () => Reactotron,
    useReactNative: () => Reactotron,
    use: () => Reactotron,
    connect: () => Reactotron,
    createEnhancer: () => Reactotron,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should init properly empty', () => {
    init({});
    expect(Init.loggers).toEqual([]);
  });

  it('should init properly', () => {
    init({ config: {}, analytics: [], errorReporters: [] });
    expect(Init.loggers).toEqual([]);
  });

  it('should init properly with wrong analytics and errorReporters', () => {
    // @ts-ignore
    init({ config: {}, analytics: [{}], errorReporters: [{}] });
    expect(Init.loggers).toEqual([]);
  });

  it('should init properly and log event with reject', () => {
    init({
      config: {
        useFlipperPlugin: true,
        excludeLogs: {
          instabug: [DEBUG_LOG],
          tealium: [DEBUG_LOG],
          adobe: [DEBUG_LOG],
          firebase: [DEBUG_LOG],
          sentry: [DEBUG_LOG],
          crashlytics: [DEBUG_LOG],
        },
      },
      analytics: [
        createInstabugLogger(instabug, { invocationEvent: 'shake', token: 'token' }),
        createTealiumLogger(Tealium, configTealium),
        createAdobeLogger(ACPAnalytics, ACPCore),
        createFirebaseLogger(analytics),
        createSentryLogger(sentry, { dsn: 'dsn' }),
        createCrashlyticsLogger(crashlytics),
      ],
    });
    logDebugEvent('event');
    logWarningEvent('event');
  });

  it('should init not properly 2', () => {
    init({
      config: {
        reportJSErrors: true,
        isSensitiveBuild: true,
        useFlipperPlugin,
        excludeLogs: { instabug: [DEBUG_LOG] },
        addPlugin,
      },
    });
    expect(Init.excludeLogs).toEqual({ instabug: [DEBUG_LOG] });
  });

  // Firebase & Sentry

  it('should init Firebase & Sentry with wrong datas + printLogs', () => {
    init({
      analytics: [createFirebaseLogger({}, true), createSentryLogger({ init: jest.fn() }, { dsn: 'dsn' }, true)],
      errorReporters: [createCrashlyticsLogger({}, true)],
    });
    logEvent('event', { key: 'value' });
    recordError('error', { key: 'value' });
  });

  it('should init Firebase & Sentry with wrong datas + printLogs with sensitiveData', () => {
    init({
      config: {
        isSensitiveBuild: true,
      },
      analytics: [createFirebaseLogger({}, true), createSentryLogger({ init: jest.fn() }, { dsn: 'dsn' }, true)],
      errorReporters: [createCrashlyticsLogger({}, true)],
    });
    logEvent('event', { key: 'value' }, true);
    recordError('error', { key: 'value' });
  });

  it('should init Firebase & Sentry with wrong datas', () => {
    init({
      config: {
        isSensitiveBuild: true,
      },
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

  it('should init Tealium & Adobe with wrong datas + printLogs', () => {
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

  it('should init Tealium & Adobe with wrong datas', () => {
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
      analytics: [createTealiumLogger(Tealium, configTealium), createAdobeLogger(ACPAnalytics, ACPCore)],
    });
    log('event', -1);
  });

  it('should init properly and log without param', () => {
    givenSetSensitiveBuild(false);
    init({
      analytics: [createTealiumLogger(Tealium, configTealium), createAdobeLogger(ACPAnalytics, ACPCore)],
    });
    logEvent('event');
    logWarningEvent('event');
    logDebugEvent('event');
    logNetworkEvent('event');
    logErrorEvent('event');
  });

  // Instabug
  it('should init Instabug properly and log event without invocationEvent', () => {
    init({
      analytics: [createInstabugLogger(instabug, { token: 'token' })],
    });
    logEvent('event', { key: 'value' }, true);
  });

  it('should init Instabug not properly + printLogs', () => {
    init({
      analytics: [createInstabugLogger(instabugWrong, { token: 'token' }, true)],
    });
    logEvent('event', { key: 'value' }, true);
  });

  it('should init Instabug not properly', () => {
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

  it('should init properly and record error without flipper', () => {
    init({ config: { reportJSErrors: true }, errorReporters: [createCrashlyticsLogger(crashlytics)] });
    recordError('error', { key: 'value' });
  });

  function givenSetSensitiveBuild(isSensitive: boolean = true) {
    // @ts-ignore
    Init.isSensitiveBuild = isSensitive;
  }
});
