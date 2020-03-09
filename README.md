# react-native-logging

- [Getting started](#getting-started)
- [Status](#status)
- [Usage](#usage)
    - [Imports](#imports)
    - [How to use](#how-to-use)
        - [Initialization](#initialization)
        - [Usage](#usage)
    - [Implemented libraries](#implemented-libraries)
        - [Firebase](#firebase)
        - [Sentry](#sentry)

## Getting started

`$ yarn add react-native-logging`

or

`$ npm install react-native-logging`

## Status

|Library             |Supported        
|----------------|-------------|
|Firebase|:white_check_mark:|
|Sentry|:white_check_mark:|
|Adobbe|:x:|


## Usage

### Imports

To start, you have to import libraries which will be used.
```javascript
import initLogging, {
  createFirebaseLogger,
  createSentryLogger,
  setupReactotron,
  setupReactotronWithRedux,
  logEvent,
} from 'react-native-logging';
```

And the others if you want to plug to our library.
```javascript
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import analytics from '@react-native-firebase/analytics';
import * as Sentry from "@sentry/react-native";
```

### How to use
Before any call to `react-native-logging`'s features, you have to initialize it.

#### Initialization

Librarie's initialization function take two parameters `initLogging(config, loggers)`:
- `config: IConfig`: IConfig is an object which takes `Reactotron` and `reactotronRedux` as parameters. Need to pass reactotron's libraries to be able to use it later.
- `loggers: Array<Function>`: array of function, functions imported from this library to send log to use libraries like firebase, sentry..

With reactotron, redux & firebase
```javascript
initLogging({
Reactotron,
reactotronRedux,
}, [createFirebaseLogger(analytics())]);
```
Only Sentry
```javascript
initLogging({}, [createSentryLogger(Sentry)]);
```

#### Usage

`Reactotron`=> to add to redux store
```javascript
{...}

const store = createStore(
  rootReducer,
  compose(
    ...,
    setupReactotron('APP_NAME').createEnhancer()
OR
    setupReactotronWithRedux('APP_NAME').createEnhancer()
  )
);

{...}
```

`Loggers` => to call where do you want/need
```javascript
logEvent('EVENT_NAME', { your_key: 'value' });
```


### Implemented libraries

#### Firebase

Need to add `@react-native-firebase/app` and `@react-native-firebase/analytics` to your project and follow their documentations to setup them properly.

To be able to send log to firebase analytics each time when you will call our `logEvent`, you need to add `createFirebaseLogger` to our `initLogging`'s second parameter which take an array.

`createFirebaseLogger` take one parameter, you have to add it `analytics()`from `@react-native-firebase/analytics`

#### Sentry

Need to add `@sentry/react-native` to your project and follow their documentations to setup them properly.

To be able to send log to sentry each time when you will call our `logEvent`, you need to add `createSentryLogger` to our `initLogging`'s second parameter which take an array.

`createSentryLogger` take two parameters, you have to add it `Sentry`from `@sentry/react-native` and sentry config object:
```javascript
{
    dsn: 'YOUR_DSN',
}
```
