import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './src/redux';
import AppContainer from './src/navigation/AppNavigation';
import { enableScreens } from 'react-native-screens';
import thunk from 'redux-thunk';
const store = createStore(AppReducer, applyMiddleware(thunk));

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    enableScreens();
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

//AppRegistry.registerComponent('App', () => App);

