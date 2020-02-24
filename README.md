# react-native-logging

## Getting started

`$ yarn add react-native-logging`

or

`$ npm install react-native-logging`

## Usage

### Reactotron


```javascript
import { setupReactotron } from 'react-native-logging';

{...}

const store = createStore(rootReducer, compose(..., setupReactotron('APP_NAME').createEnhancer()));
```
