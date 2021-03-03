# Changelog

### Version 1.3.0
    
- BREAKING CHANGES
    - We are not anymore supporting Tealium versions lower than 2.0.2.
    
### Version 1.2.3
    
- News
    - adds a new param uriEncodedStackTrace to the list of key/values to log when there is a JS crash

### Version 1.2.2
    
- BugFixes
    - fix issue which appeared when react-native-flipper not used

### Version 1.2.1
    
- BugFixes
    - Fix small issue when app refreshed many times

### Version 1.2.0
    
- News
    - Can be plugged to Flipper with `flipper-plugin-react-native-logging-tools` to display all events sent to different service.

### Version 1.1.0
    
- News
    - Support Adobe and Tealium
    - Can exclude service by message type, if we don't want to send each message type to each service (eg. network error..) 
    - Increase reactotron plugin's limit to 5
- BugFixes
    - improve the support of typescript

### Version 1.0.2

- BREAKING CHANGES
    - `setupReactotron` take an object as parameter and not only a string
    - Instead of setup reactotronRedux during the initialization to plug plugin eg redux, we will keep only reactotron's initialization and add plugins as an array and plug to reactotron on the library's side
    
    before: 

    ```javascript
    init({ config: { Reactotron, reactotronRedux, AsyncStorage } });
    setupReactotronWithRedux('app_name');
    ```

    now:

    ```javascript
    init({ config: { Reactotron, AsyncStorage } });
    setupReactotron({ name: 'app_name' }, [reactotronRedux(), ...otherPlugins()]);
    ```
    
- News
    - Can set reactotron's config as the user want
    - Can plug up to 3 additional plugins to reactotron 
- BugFixes
    - [fix IDE integration](https://github.com/imranMnts/react-native-logging-tools/issues/5)
    - [fix sensitiveData's status to optional](https://github.com/imranMnts/react-native-logging-tools/issues/5)

### Version 1.0.0
- Library created
