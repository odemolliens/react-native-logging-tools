# react-native-logging

A react native module that lets you to:
 - Connect your app to reactotron easily
 - Plug many analytics libraries and send data to everyone every time
 - Plug many crash reporter libraries and send error event to everyone every time
 - Register a global error handler which will capture fatal JS exceptions and send a report to your crash reporter libraries

and all this, as easily as possible

- [Getting started](#getting-started)
- [Status](#status)
- [Usage](#usage)
    - [Imports](#imports)
    - [How to use](#how-to-use)
        - [Initialization](#initialization)
        - [Usage](#usage)
    - [Implemented libraries](#implemented-libraries)
        - [Firebase crashlytics](#firebase-crashlytics)
        - [Firebase analytics](#firebase-analytics)
        - [Sentry](#sentry)

## Getting started

`$ yarn add react-native-logging`

or

`$ npm install react-native-logging`

## Status of supported libraries

|Library             |Supported        |Supported versions
|----------------|-------------|-------------|
|@react-native-firebase/analytics|:white_check_mark:| \>= 6.0.0
|@react-native-firebase/crashlytics|:white_check_mark:| \>= 6.0.0
|@sentry/react-native|:white_check_mark:| \>= 1.3.0
|Adobe|:x:|


## Usage

### Imports

To start, you have to import libraries which will be used.
```javascript
import initLogging, {
  createFirebaseLogger,
  createCrashlyticsLogger,
  createSentryLogger,
  setupReactotron,
  setupReactotronWithRedux,
  logEvent,
} from 'react-native-logging';
```

And the others libraries which can bu plugged
```javascript
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from "@sentry/react-native";
import AsyncStorage from '@react-native-community/async-storage';
```

### How to use
Before any call to `react-native-logging`'s features, you have to initialize it.

#### Initialization

Librarie's initialization function take an object as parameter `initialization(init: IInit)`:
init is an object which take three keys/values:
- `config?: IConfig`: IConfig is an object which takes: 
    - `Reactotron?`: Reactotron library from reactotron-react-native
    - `reactotronRedux?`: reactotronRedux library from reactotron-redux
    - `AsyncStorage?`: from @react-native-community/async-storage ie
    - `reportJSErrors?: boolean`: to set to true if you want send js crash reports`
- `analytics?: Array<Function>`: functions imported from this library (ie: `createFirebaseLogger`) to send log/analytics when you will call `logEvent`
- `errorReporters?: Array<Function>`: functions imported from this library (ie: `createCrashlyticsLogger`) to send errors when you will call `recordError` or when app crashed with a JS error (only if `reportJSErrors` is true and `errorReporters` not empty )

###### Examples

With Reactotron Redux, Firebase analytics, crashlytics & handle fatal JS error to send to crash services in release mode
```javascript
initLogging({
  config: { reportJSErrors: !__DEV__ },
  analytics: [createFirebaseLogger(analytics())],
  errorReporters: [createCrashlyticsLogger(crashlytics())],
});
```
Only Sentry with only Reactotron
```javascript
initLogging({
  config: { Reactotron },
  analytics: [createSentryLogger(analytics())],
  errorReporters: [createCrashlyticsLogger(crashlytics())],
});
```

#### Usage

##### Reactotron

If you initialized Reactotron (and/or reactotronRedux), you can plug it to your redux store
```javascript
const store = createStore(
  rootReducer,
  compose(
    ...,
    setupReactotron('APP_NAME').createEnhancer()
OR
    setupReactotronWithRedux('APP_NAME').createEnhancer()
  )
);
```

##### Loggers

###### Events

You can call this function where do you want/need to send logs to each plugged libraries
```javascript
logEvent('EVENT_NAME', { your_key: 'value' });
```

If you use `react-navigation` and you want send to analytics navigation events e.g, you can add `logEvent` to his event handler [(React-navigation docs)](https://reactnavigation.org/docs/navigation-events/)

###### Errors

You can call this function where do you want/need to send logs to each plugged libraries
```javascript
recordError('EVENT_NAME', { your_key: 'value' });
```


### Implemented libraries

#### Firebase crashlytics

Need to add `@react-native-firebase/app` and `@react-native-firebase/crashlytics` to your project and follow their documentations to setup them properly.

To be able to send error to firebase crashlytics each time when you will call our `recordError`, you need to add `createCrashlyticsLogger` to our `initLogging`'s thrid parameter which take an array.

`createCrashlyticsLogger` take one parameter, you have to add it `crashlytics()` from `@react-native-firebase/crashlytics`

#### Firebase analytics

Need to add `@react-native-firebase/app` and `@react-native-firebase/analytics` to your project and follow their documentations to setup them properly.

To be able to send log to firebase analytics each time when you will call our `logEvent`, you need to add `createFirebaseLogger` to our `initLogging`'s second parameter which take an array.

`createFirebaseLogger` take one parameter, you have to add it `analytics()` from `@react-native-firebase/analytics`

#### Sentry

Need to add `@sentry/react-native` to your project and follow their documentations to setup them properly.

To be able to send log to sentry each time when you will call our `logEvent`, you need to add `createSentryLogger` to our `initLogging`'s second parameter which take an array.

`createSentryLogger` take two parameters, you have to add it `Sentry` from `@sentry/react-native` and sentry config object:
```javascript
{
    dsn: 'YOUR_DSN',
}
```

### Crash reporting

If you decided to use the crash handler, it will catch all fatal JS errors and sent a report to libraries added to `recordErrors` during the initialization
