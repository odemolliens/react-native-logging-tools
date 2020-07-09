# React Native Logging Tools

A react native module that lets you:
 - Connect your app to reactotron easily
 - Send logs to multiple services in one time
 - Send crash/error reports to multiple services in one time
 - Register a global error handler which will capture fatal JS exceptions and send a report to your crash reporter libraries

and all this, as easily as possible

- [Getting started](#getting-started)
- [Status of supported libraries](#status-of-supported-libraries)
- [Usage](#usage)
    - [Imports](#imports)
    - [Initialization](#initialization)
    - [How to use](#how-to-use)
        - [Reactotron](#reactotron)
        - [Loggers](#loggers)
            - [Events](#events)
            - [Errors](#errors)

---

## Getting started

`$ yarn add react-native-logging-tools`

or

`$ npm install react-native-logging-tools`

---

## Status of supported libraries

|Library             |Supported        |Supported versions
|----------------|-------------|-------------|
|@react-native-firebase/analytics|:white_check_mark:| \>= 6.0.0
|@react-native-firebase/crashlytics|:white_check_mark:| \>= 6.0.0
|@sentry/react-native|:white_check_mark:| \>= 1.3.0
|instabug-reactnative|:white_check_mark:| \>= 9.0.0

---

## Usage

### Imports

To start, you have to import libraries which will be used.
```javascript
import {
  init,
  createFirebaseLogger,
  createCrashlyticsLogger,
  createSentryLogger,
  setupReactotron,
  setupReactotronWithRedux,
  logEvent,
} from 'react-native-logging-tools';
```

And the others libraries which can be plugged
```javascript
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import Instabug from 'instabug-reactnative';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from "@sentry/react-native";
import AsyncStorage from '@react-native-community/async-storage';
```

### Initialization

Before any call to `react-native-logging-tools`'s features, you have to initialize it (in your `App.ts` or `store.ts` for example)

```javascript
init({
  config: {
    Reactotron,
    AsyncStorage,
    reportJSErrors: !__DEV__,
    isSensitiveBuild: __STORE__ },
  analytics: [createFirebaseLogger(analytics(), true)],
  errorReporters: [createCrashlyticsLogger(crashlytics())],
});
```

Documentation and examples about initialization steps can be found [here](./REFERENCE_API.md).

### How to use

#### Reactotron

```javascript
init({
  config: { Reactotron },
});
```

Documentation and example about Reactotron can be found [here](./REFERENCE_API.md).

#### Loggers

##### Events

You can call this function where do you want/need to send logs to each plugged libraries to `analytics` during the initialization step

```javascript
logEvent('EVENT_NAME', { your_key: 'value' });
logDebugEvent('EVENT_NAME', { your_key: 'value' });
logErrorEvent('EVENT_NAME', { your_key: 'value' });
logNetworkEvent('EVENT_NAME', { your_key: 'value' });
logWarningEvent('EVENT_NAME', { your_key: 'value' });
```

Documentation and example about logging event can be found [here](./REFERENCE_API.md).

If you use `react-navigation` and you want send to analytics navigation events e.g, you can add `logEvent` to his event handler [(React-navigation docs)](https://reactnavigation.org/docs/navigation-events/)

##### Errors

You can call this function where do you want/need to send logs to each plugged libraries to `errorReporters` during the initialization step

```javascript
recordError('EVENT_NAME', { your_key: 'value' });
```

Documentation and example about error reporting can be found [here](./REFERENCE_API.md).
