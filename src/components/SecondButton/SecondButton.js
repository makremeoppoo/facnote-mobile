import React from 'react';
import {TouchableHighlight, Image, Text, View} from 'react-native';
import styles from './styles';
import {text} from '../../constants';

export default class SecondButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor="rgba(214, 214, 214, 0.4)"
        style={styles.btnContainer}
        onPress={this.props.onPress}>
        <Text style={styles.btnTxt}>{this.props.label}</Text>
      </TouchableHighlight>
    );
  }
}
