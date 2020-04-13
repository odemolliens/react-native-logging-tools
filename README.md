# React Native Logging Tools

A react native module that lets you:
 - Connect your app to reactotron easily
 - Plug multiple analytics libraries to your project
    - Firebase analytics
    - Sentry
 - Plug multiple crash reporter libraries to your project
    - Firebase crashlytics
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

`$ yarn add react-native-logging-tools`

or

`$ npm install react-native-logging-tools`

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
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from "@sentry/react-native";
import AsyncStorage from '@react-native-community/async-storage';
```

### How to use
Before any call to `react-native-logging-tools`'s features, you have to initialize it.

#### Initialization

Documentation and examples for initialization step can be found [here](./REFERENCE_API.md).

#### Usage

##### Reactotron

Documentation and example for Reactotron can be found [here](./REFERENCE_API.md).

##### Loggers

###### Events

You can call this function where do you want/need to send logs to each plugged libraries

Documentation and example for log event can be found [here](./REFERENCE_API.md).

If you use `react-navigation` and you want send to analytics navigation events e.g, you can add `logEvent` to his event handler [(React-navigation docs)](https://reactnavigation.org/docs/navigation-events/)

###### Errors

You can call this function where do you want/need to send logs to each plugged libraries

Documentation and example for error report can be found [here](./REFERENCE_API.md).

### Implemented libraries

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

### Crash reporting

If you decided to use the crash handler, it will catch all fatal JS errors and sent a report to libraries added to `recordErrors` during the initialization
