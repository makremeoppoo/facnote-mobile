/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
} from 'react-native';

import {text} from '../../constants';
import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';

import styles from './styles';
class HomeScreen extends React.Component {
  render() {
    return (
      <>
        <NavigationHeader title={text.Indicateur} powerOff={true} subTitle={'Exercice'} />
        <View style={styles.container}></View>
      </>
    );
  }
}

export default HomeScreen;
