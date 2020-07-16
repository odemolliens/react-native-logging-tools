# Reference API

Page containing the full index of all React Native Logging Tools reference API types

- [API](#api)
  - [init](#init)
  - [setupReactotron](#setupreactotron)
  - [createFirebaseLogger](#createfirebaselogger)
  - [createSentryLogger](#createsentrylogger)
  - [createCrashlyticsLogger](#createcrashlyticslogger)
  - [logEvent](#logevent)
  - [recordError](#recorderror)
- [Supported libraries](#supported-libraries)
  - [Firebase crashlytics](#firebase-crashlytics)
  - [Firebase analytics](#firebase-analytics)
  - [Sentry](#sentry)

## API

### init

Library initializer, to be used before anything

It take an object as parameter `initialization(init: IInit)`:
init is an object which take three keys/values:

- `config: object`: library's config object (optional)
  - `Reactotron`: Reactotron library from reactotron-react-native (optional) (mandatory if you want plug Reactotron to your store)
  - `AsyncStorage`: from @react-native-community/async-storage ie (optional)
  - `reportJSErrors: boolean`: set to true if you want turn on automatic fetch and send js crash to `errorReporters` (optional)
  - `isSensitiveBuild: boolean`: set to true if you want defined some logEvent as sensitive and not send log for this one (optional)
  - `excludeLogs: object`: to exclude log types to not send to libraries which have been set (optional)       
       
        - `adobe: Array<number>`: add to an array, the log types which should *NOT* sent to adobe (optional)
        - `crashlytics: Array<number>`: add to an array, the log types which should *NOT* sent to crashlytics (optional)
        - `firebase: Array<number>`: add to an array, the log types which should *NOT* sent to firebase (optional)
        - `instabug: Array<number>`: add to an array, the log types which should *NOT* sent to instabug (optional)
        - `sentry: Array<number>`: add to an array, the log types which should *NOT* sent to sentry (optional)
        - `tealium: Array<number>`: add to an array, the log types which should *NOT* sent to tealium (optional)
        
  (0 = DEBUG, 1 = WARNING, 2 = NETWORK, 3 = ERROR)
  
- `analytics: Array<Function>`: functions imported from this library (ie: `createFirebaseLogger`) to send log/analytics when you will call `logEvent` (optional)
- `errorReporters: Array<Function>`: functions imported from this library (ie: `createCrashlyticsLogger`) to send errors when you will call `recordError` or when app crashed with a JS error (only if `reportJSErrors` is true and `errorReporters` not empty) (optional)

#### Examples

With Reactotron Redux, Instabug, Firebase analytics, crashlytics & handle fatal JS error to send to crash services in release mode

```javascript
init({
  config: { Reactotron, AsyncStorage, reportJSErrors: !__DEV__ },
  analytics: [createFirebaseLogger(analytics(), true), createInstabugLogger(Instabug)],
  errorReporters: [createCrashlyticsLogger(crashlytics())],
});
```

Only Sentry with only Reactotron

```javascript
init({
  config: { Reactotron },
  analytics: [createSentryLogger(sentry, { dsn: 'dsn' })],
  errorReporters: [createCrashlyticsLogger(crashlytics())],
});
```

---

### setupReactotron

To plug Reactotron to your redux store.

Reactotron should be already initialized in `init` function

One parameter:

- `config: any`: the config of the reactotron (optional)
- `plugins: Array<Function>`: plugins which will be uses with reactotron (max 5) (optional)

#### Example

Minimum required in `init` to plug reactotron
```javascript
init({
  config: { 
    Reactotron,
    ...,
  },
  ...,
});
```
Usage
```javascript
const store = createStore(
  rootReducer,
  compose(
    setupReactotron({ name: 'APP_NAME', host: '192.0.0.0' }, [reactotronRedux(), sagaPlugin({})]).createEnhancer()
    ...,
  )
);
```

---

### createFirebaseLogger

To plug Firebase analytics to send event later.

Two parameters:

- `analytics()`: analytics() function from `@react-native-firebase/analytics`
- `printLogs: boolean`: to print or not firebase event's errors (optional)(default: false)

#### Example

```javascript
init({
  analytics: [createFirebaseLogger(analytics(), true)],
});
```

---

### createSentryLogger

To plug Sentry to send event later.

Two parameters:

- `sentry`: Sentry module from `@sentry/react-native`
- `config`: object which take one key/value:
  - `dsn: string`: project DSN, to take from Sentry dashboard
- `printLogs: boolean`: to print or not sentry event's errors (optional)(default: false)

#### Example

```javascript
init({
  analytics: [createSentryLogger(Sentry, { dsn: 'dsn' }, true)],
});
```

---

### createInstabugLogger

To plug Instabug to send event later.

Two parameters:

- `instabug`: Instabug module from `instabug-reactnative`
- `config`: object which take one key/value:
  - `token: string`: your application's token
  - `invocationEvent`: [here](https://docs.instabug.com/docs/react-native-invocation) (default: `Instabug.invocationEvent.shake`)
- `printLogs: boolean`: to print or not instabug event's errors (optional)(default: false)

#### Example

```javascript
init({
  analytics: [createInstabugLogger(Instabug, { token: 'APP_TOKEN', invocationEvent: 'invocationEvent' }, true)],
});
```

---

### createTealiumLogger

To plug Tealium to send event later.

Two parameters:

- `tealium`: Tealium module from `tealium-react-native`
- `config`: object which take keys/values: [Official doc](https://docs.tealium.com/platforms/react-native/api/#initialize)
  - `account: string`: Tealium account name
  - `profile: string`: Tealium profile name
  - `environment: string`: Tealium environment name
  - `iosDatasource: string`: Tealium iOS data source key (optional)
  - `androidDatasource: string`: Tealium Android data source key (optional)
  - `instance: boolean`: Tealium instance name (optional)(default: "MAIN")
  - `isLifecycleEnabled: boolean`: To enable lifecycle tracking (optional)(default: true)
- `printLogs: boolean`: to print or not firebase event's errors (optional)(default: false)

#### Example

```javascript
init({
  analytics: [
    createTealiumLogger(Tealium, { account: 'accountName', profile: 'profileName', environment: 'environment' }, true),
  ],
});
```

---

### createAdobeLogger

To plug Adobe to send event later.

Two parameters:

- `adobeAnalytics`: ACPAnalytics module from `@adobe/react-native-acpanalytics`
- `adobeLogger`: ACPCore module from `@adobe/react-native-acpcore`
- `printLogs: boolean`: to print or not firebase event's errors (optional)(default: false)

#### Example

```javascript
init({
  analytics: [createAdobeLogger(ACPAnalytics, ACPCore, true)],
});
```

---

### createCrashlyticsLogger

To plug Firebase crashlytics to send event later.

Two parameters:

- `crashlytics()`: crashlytics() function from `@react-native-firebase/crashlytics`
- `printLogs: boolean`: to print or not firebase event's errors (optional)(default: false)

#### Example

```javascript
init({
  errorReporters: [createCrashlyticsLogger(crashlytics(), true)],
});
```

---

### logEvent

To send an event to analytics services

Two parameters:

- `event: string`: event's title to send to analytics
- `params: object`: keys/values to send to analytics (default: `{}`)
- `sensitiveData: boolean`: set true if is sensitive data which will be sent to disable for the store build eg (`isSensitiveBuild` should be set to true during initialization too for the build which will be sent to store) (default: `false`)

#### Example

```javascript
logEvent('EVENT_NAME', { your_key: 'value' }, true);
```

---

### logDebugEvent

To send an event to analytics services, it's the same as `logEvent` but it will
 - Automatically prefix the event name with `D/` to facilitate the reading
 - Do not send the log to excluded services during the init step
    
    eg. You use `react-native-logging-tools` with adobe, firebase and instabug, and you dont want to send debug messages to instabug, you have to:
    
```javascript
    import {
      init,
      DEBUG_LOG,
    } from 'react-native-logging-tools';

    init(
     {
        excludeLogs: {
            instabug: [DEBUG_LOG],
        },
        ...,
     },
    ...,
    )
```

`logDebugEvent` takes three parameters:

- `event: string`: event's title to send to analytics
- `params: object`: keys/values to send to analytics (default: `{}`)
- `sensitiveData: boolean`: set true if is sensitive data which will be sent to disable for the store build eg (`isSensitiveBuild` should be set to true during initialization too for the build which will be sent to store) (default: `false`)

#### Example

```javascript
logDebugEvent('EVENT_NAME', { your_key: 'value' }, true);
```

---

### logWarningEvent

To send an event to analytics services, it's the same as `logEvent` but it will:
 - Automatically prefix the event name with `W/` to facilitate the reading
 - Do not send the log to excluded services during the init step
    
    eg. You use `react-native-logging-tools` with adobe, firebase and instabug, and you dont want to send debug AND warning messages to instabug AND adobe, you have to:
    
```javascript
    import {
      init,
      DEBUG_LOG,
      WARNING_LOG,
    } from 'react-native-logging-tools';

    init(
     {
        excludeLogs: {
            instabug: [DEBUG_LOG, WARNING_LOG],
            adobe: [DEBUG_LOG, WARNING_LOG],
        },
        ...,
     },
    ...,
    )
```

`logWarningEvent` takes three parameters:

- `event: string`: event's title to send to analytics
- `params: object`: keys/values to send to analytics (default: `{}`)
- `sensitiveData: boolean`: set true if is sensitive data which will be sent to disable for the store build eg (`isSensitiveBuild` should be set to true during initialization too for the build which will be sent to store) (default: `false`)

#### Example

```javascript
logWarningEvent('EVENT_NAME', { your_key: 'value' }, true);
```

---

### logNetworkEvent

To send an event to analytics services, it's the same as `logEvent` but it will:
 - Automatically prefix the event name with `N/` to facilitate the reading
 - Do not send the log to excluded services during the init step
    
    eg. You use `react-native-logging-tools` with adobe, firebase and instabug, and you dont want to send network messages to firebase, you have to:
    
```javascript
    import {
      init,
      NETWORK_LOG,
    } from 'react-native-logging-tools';

    init(
     {
        excludeLogs: {
            firebase: [NETWORK_LOG],
        },
        ...,
     },
      ...,
    )
```

`logNetworkEvent` takes three parameters:

- `event: string`: event's title to send to analytics
- `params: object`: keys/values to send to analytics (default: `{}`)
- `sensitiveData: boolean`: set true if is sensitive data which will be sent to disable for the store build eg (`isSensitiveBuild` should be set to true during initialization too for the build which will be sent to store) (default: `false`)

#### Example

```javascript
logNetworkEvent('EVENT_NAME', { your_key: 'value' }, true);
```

---

### logErrorEvent

To send an event to analytics services, it's the same as `logEvent` but it will:
 - Automatically prefix the event name with `E/` to facilitate the reading
 - Do not send the log to excluded services during the init step
    
    eg. You use `react-native-logging-tools` with adobe, firebase and instabug, and you dont want to send error messages to instabug, you have to:
    
```javascript
    import {
      init,
      DEBUG_LOG,
    } from 'react-native-logging-tools';

    init(
     {
        excludeLogs: {
            instabug: [ERROR_LOG],
        },
        ...,
     }
    )
```

`logErrorEvent` takes three parameters:

- `event: string`: event's title to send to analytics
- `params: object`: keys/values to send to analytics (default: `{}`)
- `sensitiveData: boolean`: set true if is sensitive data which will be sent to disable for the store build eg (`isSensitiveBuild` should be set to true during initialization too for the build which will be sent to store) (default: `false`)

#### Example

```javascript
logErrorEvent('EVENT_NAME', { your_key: 'value' }, true);
```

---

### recordError

To send an error report to error reporter services

Two parameters:

- `event: string`: event's title to send to error reporters
- `params: object`: keys/values to send to error reporters

#### Example

```javascript
recordError('EVENT_NAME', { your_key: 'value' });
```

---

### Supported libraries

#### Firebase crashlytics

Need to add `@react-native-firebase/app` and `@react-native-firebase/crashlytics` to your project and follow their documentations to setup them properly.

To be able to send error to firebase crashlytics each time when you will call our `recordError`, you need to add `createCrashlyticsLogger` to our `init` function's `errorReporters` array.

Please refer to `createCrashlyticsLogger` to know how to init it

#### Firebase analytics

Need to add `@react-native-firebase/app` and `@react-native-firebase/analytics` to your project and follow their documentations to setup them properly.

To be able to send log to firebase analytics each time when you will call our `logEvent`, you need to add `createFirebaseLogger` to our `init` function's `analytics` array.

Please refer to `createFirebaseLogger` to know how to init it

#### Sentry

Need to add `@sentry/react-native` to your project and follow their documentations to setup them properly.

To be able to send log to sentry each time when you will call our `logEvent`, you need to add `createSentryLogger` to our `init` function's `analytics` array.

Please refer to `createSentryLogger` to know how to init it

#### Instabug

Need to add `instabug-reactnative` to your project and follow their documentations to setup them properly.

To be able to send log to instabug each time when you will call our `logEvent`, you need to add `createInstabugLogger` to our `init` function's `analytics` array.

Please refer to `createInstabugLogger` to know how to init it

#### Adobe

Need to add `@adobe/react-native-acpcore` and `@adobe/react-native-acpanalytics` to your project and follow their documentations to setup them properly.

To be able to send log to adobe each time when you will call our `logEvent`, you need to add `createAdobeLogger` to our `init` function's `analytics` array.

Please refer to `createAdobeLogger` to know how to init it

#### Tealium

Need to add `tealium-react-native` to your project and follow their documentations to setup them properly.

To be able to send log to instabug each time when you will call our `logEvent`, you need to add `createTealiumLogger` to our `init` function's `analytics` array.

Please refer to `createTealiumLogger` to know how to init it

#### Crash reporting

If you decided to use the crash handler, it will catch all fatal JS errors and sent a report to libraries added to `recordErrors` during the initialization
