/* eslint-disable comma-dangle */
import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class NavigationHeader extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.headerButtonContainer}
        onPress={this.props.onPress}>
        <View style={styles.headerContain}>
          <Image
            style={styles.headerButtonImage}
            source={require('../../../assets/images/NavigationBackground.png')}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={this.props.onPress}>
              <Image
                source={require('../../../assets/icons/backArrow.png')}
                style={styles.btnIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

NavigationHeader.propTypes = {
  onPress: PropTypes.func,
};
