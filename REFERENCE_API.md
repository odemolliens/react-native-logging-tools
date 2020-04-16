# Reference API

Page containing the full index of all React Native Logging Tools reference API types

- [API](#api)
    - [init](#init)
    - [setupReactotron](#setupreactotron)
    - [setupReactotronWithRedux](#setupreactotronwithredux)
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
    - `reactotronRedux`: reactotronRedux library from reactotron-redux (optional) (mandatory if you want plug reactotronRedux to your store)
    - `AsyncStorage`: from @react-native-community/async-storage ie (optional)
    - `reportJSErrors: boolean`: to set to true if you want send js crash reports` (optional)
- `analytics: Array<Function>`: functions imported from this library (ie: `createFirebaseLogger`) to send log/analytics when you will call `logEvent` (optional)
- `errorReporters: Array<Function>`: functions imported from this library (ie: `createCrashlyticsLogger`) to send errors when you will call `recordError` or when app crashed with a JS error (only if `reportJSErrors` is true and `errorReporters` not empty) (optional)

#### Examples

With Reactotron Redux, Firebase analytics, crashlytics & handle fatal JS error to send to crash services in release mode
```javascript
init({
  config: { Reactotron, AsyncStorage, reactotronRedux, reportJSErrors: !__DEV__ },
  analytics: [createFirebaseLogger(analytics(), true)],
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
------
### setupReactotron

To plug Reactotron to your redux store.

Reactotron should be already initialized in `init` function

One parameter:
- `appName: string`: the name of the app 

#### Example

```javascript
const store = createStore(
  rootReducer,
  compose(
    ...,
    setupReactotron('APP_NAME').createEnhancer()
  )
);
```
------
### setupReactotronWithRedux

To plug Reactotron and redux tools to your redux store.

Reactotron and reactotronRedux should be already initialized in `init` function

One parameter:
- `appName: string`: the name of the app 

#### Example

```javascript
const store = createStore(
  rootReducer,
  compose(
    ...,
    setupReactotronWithRedux('APP_NAME').createEnhancer()
  )
);
```
------
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
------
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
------
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
------
### logEvent

To send an event to analytics services

Two parameters:
- `event: string`: event's title to send to analytics
- `params: object`: keys/values to send to analytics

#### Example

```javascript
logEvent('EVENT_NAME', { your_key: 'value' });
```
------
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

To be able to send error to firebase crashlytics each time when you will call our `recordError`, you need to add `createCrashlyticsLogger` to our `init`'s thrid parameter which take an array.

`createCrashlyticsLogger` take one parameter, you have to add it `crashlytics()` from `@react-native-firebase/crashlytics`

#### Firebase analytics

Need to add `@react-native-firebase/app` and `@react-native-firebase/analytics` to your project and follow their documentations to setup them properly.

To be able to send log to firebase analytics each time when you will call our `logEvent`, you need to add `createFirebaseLogger` to our `init`'s second parameter which take an array.

`createFirebaseLogger` take one parameter, you have to add it `analytics()` from `@react-native-firebase/analytics`

#### Sentry

Need to add `@sentry/react-native` to your project and follow their documentations to setup them properly.

To be able to send log to sentry each time when you will call our `logEvent`, you need to add `createSentryLogger` to our `init`'s second parameter which take an array.

`createSentryLogger` take two parameters, you have to add it `Sentry` from `@sentry/react-native` and sentry config object:
```javascript
{
    dsn: 'YOUR_DSN',
}
```

#### Crash reporting

If you decided to use the crash handler, it will catch all fatal JS errors and sent a report to libraries added to `recordErrors` during the initialization
