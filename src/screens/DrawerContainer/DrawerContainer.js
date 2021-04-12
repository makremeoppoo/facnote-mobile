/* eslint-disable comma-dangle */
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function DrawerContainer({navigation}) {
  return (
    <View style={styles.content}>
   </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
