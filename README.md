# react-native-logging

## Getting started

`$ yarn add react-native-logging`

or

`$ npm install react-native-logging`

## Usage

### Imports

To start, you have to import libraries which will be used.
```javascript
import initLogging, {
  createFirebaseLogger,
  createSentryLogger,
  setupReactotronWithRedux,
  logEvent,
} from 'react-native-logging';
```

In this example, we will use reactotron with redux and firebase analytics.
```javascript
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import analytics from '@react-native-firebase/analytics';
import * as Sentry from "@sentry/react-native";
```

### How to use?
Before any call to `react-native-logging`'s features, you have to initialize it.

With reactotron, redux & firebase
```javascript
initLogging({
Reactotron,
reactotronRedux,
}, [createFirebaseLogger(analytics())]);

{...}

const store = createStore(rootReducer, compose(..., setupReactotronWithRedux('APP_NAME').createEnhancer()));

{...}

logEvent('EVENT_NAME', { your_key: 'value' });
```
With Sentry & without reactotron & redux
```javascript
initLogging({}, [createSentryLogger(Sentry)]);
```
