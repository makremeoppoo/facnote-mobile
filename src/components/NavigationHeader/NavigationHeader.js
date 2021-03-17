/* eslint-disable comma-dangle */
import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSlidersH} from '@fortawesome/free-solid-svg-icons';
import ScaleHelpers from '../scaleHelpers';

export default class NavigationHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContain}>
        <Image
          style={styles.headerButtonImage}
          source={require('../../../assets/images/NavigationBackground.png')}
        />

        <TouchableOpacity
          style={{
            width: ScaleHelpers.CalcWidth(10),
            height: ScaleHelpers.CalcHeight(3),
            alignItems:'center'
          }}
          onPress={this.props.onPress}>
          <Image
            source={require('../../../assets/icons/backArrow.png')}
            style={styles.btnIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.subTitle}>{this.props.subTitle}</Text>
        </View>

        {this.props.onPressTwo && (
          <View style={styles.iconView}>
            <TouchableOpacity onPress={this.props.onPressTwo}>
              <FontAwesomeIcon icon={faSlidersH} size={25} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

NavigationHeader.propTypes = {
  onPress: PropTypes.func,
};
