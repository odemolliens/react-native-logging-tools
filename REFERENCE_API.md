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

- `config: IConfig`: IConfig is an object which takes: (optional)
  - `Reactotron`: Reactotron library from reactotron-react-native (optional) (mandatory if you want plug Reactotron to your store)
  - `AsyncStorage`: from @react-native-community/async-storage ie (optional)
  - `reportJSErrors: boolean`: to set to true if you want send js crash reports (optional)
  - `isSensitiveBuild: boolean`: to set to true if you want defined some logEvent as sensitive and not send log for this one (optional)
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
- `plugins: Array<Function>`: plugins which will be uses with reactotron (max 3) (optional)

#### Example

```javascript
const store = createStore(
  rootReducer,
  compose(
    ...,
    setupReactotron({ name: 'APP_NAME', host: '192.0.0.0' }, [reactotronRedux(), sagaPlugin({})]).createEnhancer()
  )
);
```

---

### createFirebaseLogger

To plug Firebase analytics to send event later.

Two parameters:

- `analytics()`: function from `@react-native-firebase/analytics`
- `printError: boolean`: to print or not firebase event's errors (optional)(default: false)

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

- `sentry`: module from `@sentry/react-native`
- `config`: object which take one key/value:
  - `dsn: string`: project DSN, to take from Sentry dashboard
- `printError: boolean`: to print or not sentry event's errors (optional)(default: false)

#### Example

```javascript
init({
  analytics: [createSentryLogger(sentry, { dsn: 'dsn' }, true)],
});
```

---

### createInstabugLogger

To plug Instabug to send event later.

Two parameters:

- `instabug`: module from `instabug-reactnative`
- `config`: object which take one key/value:
  - `token: string`: your application's token
  - `invocationEvent`: [here](https://docs.instabug.com/docs/react-native-invocation) (default: `Instabug.invocationEvent.shake`)
- `printError: boolean`: to print or not instabug event's errors (optional)(default: false)

#### Example

```javascript
init({
  analytics: [createInstabugLogger(instabug, { token: 'APP_TOKEN', invocationEvent: 'invocationEvent' }, true)],
});
```

---

### createCrashlyticsLogger

To plug Firebase crashlytics to send event later.

Two parameters:

- `crashlytics()`: function from `@react-native-firebase/crashlytics`
- `printError: boolean`: to print or not firebase event's errors (optional)(default: false)

#### Example

```javascript
init({
  analytics: [createCrashlyticsLogger(crashlytics(), true)],
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

### logWarningEvent

To send an event to analytics services, it's the same as `logEvent` but it will automatically prefix the event name with `W/` to facilitate the reading

Two parameters:

- `event: string`: event's title to send to analytics
- `params: object`: keys/values to send to analytics (default: `{}`)
- `sensitiveData: boolean`: set true if is sensitive data which will be sent to disable for the store build eg (`isSensitiveBuild` should be set to true during initialization too for the build which will be sent to store) (default: `false`)

#### Example

```javascript
logWarningEvent('EVENT_NAME', { your_key: 'value' }, true);
```

---

### logDebugEvent

To send an event to analytics services, it's the same as `logEvent` but it will automatically prefix the event name with `D/` to facilitate the reading

Two parameters:

- `event: string`: event's title to send to analytics
- `params: object`: keys/values to send to analytics (default: `{}`)
- `sensitiveData: boolean`: set true if is sensitive data which will be sent to disable for the store build eg (`isSensitiveBuild` should be set to true during initialization too for the build which will be sent to store) (default: `false`)

#### Example

```javascript
logDebugEvent('EVENT_NAME', { your_key: 'value' }, true);
```

---

### logNetworkEvent

To send an event to analytics services, it's the same as `logEvent` but it will automatically prefix the event name with `N/` to facilitate the reading

Two parameters:

- `event: string`: event's title to send to analytics
- `params: object`: keys/values to send to analytics (default: `{}`)
- `sensitiveData: boolean`: set true if is sensitive data which will be sent to disable for the store build eg (`isSensitiveBuild` should be set to true during initialization too for the build which will be sent to store) (default: `false`)

#### Example

```javascript
logNetworkEvent('EVENT_NAME', { your_key: 'value' }, true);
```

---

### logErrorEvent

To send an event to analytics services, it's the same as `logEvent` but it will automatically prefix the event name with `E/` to facilitate the reading

Two parameters:

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

`createCrashlyticsLogger` take one parameter, you have to add it `crashlytics()` from `@react-native-firebase/crashlytics`

#### Firebase analytics

Need to add `@react-native-firebase/app` and `@react-native-firebase/analytics` to your project and follow their documentations to setup them properly.

To be able to send log to firebase analytics each time when you will call our `logEvent`, you need to add `createFirebaseLogger` to our `init` function's `analytics` array.

`createFirebaseLogger` take one parameter, you have to add it `analytics()` from `@react-native-firebase/analytics`

#### Sentry

Need to add `@sentry/react-native` to your project and follow their documentations to setup them properly.

To be able to send log to sentry each time when you will call our `logEvent`, you need to add `createSentryLogger` to our `init` function's `analytics` array.

`createSentryLogger` take two parameters, you have to add it `Sentry` from `@sentry/react-native` and sentry config object:

```javascript
{
    dsn: 'YOUR_DSN',
}
```

#### Instabug

Need to add `instabug-reactnative` to your project and follow their documentations to setup them properly.

To be able to send log to instabug each time when you will call our `logEvent`, you need to add `createInstabugLogger` to our `init` function's `analytics` array.

`createInstabugLogger` take two parameters, you have to add it `Instabug` from `instabug-reactnative` and Instabug config object:
{
token: 'YOUR_APP_TOKEN',
invocationEvent: `Instabug.invocationEvent.none` eg (see more [here](https://docs.instabug.com/docs/react-native-invocation) (default: Instabug.invocationEvent.shake)
}

#### Crash reporting

If you decided to use the crash handler, it will catch all fatal JS errors and sent a report to libraries added to `recordErrors` during the initialization
