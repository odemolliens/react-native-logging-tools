[![Build Status](https://travis-ci.org/imranMnts/react-native-logging-tools.svg?branch=develop)](https://travis-ci.org/imranMnts/react-native-logging-tools)
![npm](https://img.shields.io/npm/v/react-native-logging-tools.svg)
![GitHub](https://img.shields.io/github/license/imranMnts/react-native-logging-tools.svg)

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
|@adobe/react-native-acpanalytics|:white_check_mark:| \>= 1.1.6
|@adobe/react-native-acpcore|:white_check_mark:| \>= 1.2.4
|tealium-react-native|:white_check_mark:| \>= 1.0.10

---

## Usage

### Imports

To start, you have to import methods from `react-native-logging-tools` which will be used.
```javascript
import {
  init,
  createFirebaseLogger,
  createCrashlyticsLogger,
  createSentryLogger,
  createTealiumLogger,
  createAdobeLogger,
  setupReactotron,
  logEvent,
} from 'react-native-logging-tools';
```

And the others external libraries to plug to `react-native-logging-tools`
```javascript
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import Instabug from 'instabug-reactnative';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from "@sentry/react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { ACPCore } from '@adobe/react-native-acpcore';
```

### Initialization

Before any call to `react-native-logging-tools`'s features, you have to initialize it (eg. in your `App.ts` or `store.ts`)

```javascript
init({
  config: {
    reportJSErrors: !__DEV__,
  },
  analytics: [createFirebaseLogger(analytics())],
  errorReporters: [createCrashlyticsLogger(crashlytics())],
});
```

:information_source: Documentation and example about initialization steps can be found [here](./REFERENCE_API.md).

### Features

#### Reactotron

:information_source: Documentation and example about Reactotron can be found [here](./REFERENCE_API.md).

#### JS Error handler

:information_source: Documentation and example about Reactotron can be found [here](./REFERENCE_API.md).

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

:information_source: Documentation and example about logging event can be found [here](./REFERENCE_API.md).

If you use `react-navigation` and you want send to analytics navigation events e.g, you can add `logEvent` to his event handler [(React-navigation docs)](https://reactnavigation.org/docs/navigation-events/)

##### Errors

You can call this function where do you want/need to send logs to each plugged libraries to `errorReporters` during the initialization step

```javascript
recordError('EVENT_NAME', { your_key: 'value' });
```

:information_source: Documentation and example about error reporting can be found [here](./REFERENCE_API.md).
