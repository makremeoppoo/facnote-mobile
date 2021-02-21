import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore, persistReducer} from 'redux-persist';

import {enableScreens} from 'react-native-screens';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';

import AppReducer from './src/redux';
import AppContainer from './src/navigation/AppNavigation';
// Middleware: Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, AppReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
console.disableYellowBox = true;
//const store = createStore(AppReducer, applyMiddleware(thunk));

export default class App extends React.Component {
  
  render() {
    enableScreens();
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
    </PersistGate>
      </Provider>
    );
  }
}

//AppRegistry.registerComponent('App', () => App);
