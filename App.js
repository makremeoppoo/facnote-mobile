/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppContainer from './src/navigation/AppNavigation';
import { enableScreens } from 'react-native-screens';

console.disableYellowBox = true;

const App = () => {
  enableScreens()
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
