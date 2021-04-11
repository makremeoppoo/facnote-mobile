/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, TouchableHighlight} from 'react-native';

import {Text} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faShoppingCart,
  faComment,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor, buttonColor} from '../../Theme/AppStyles';
/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import {fontType} from '../../Theme/AppStyles';

const styles = StyleSheet.create({
  itemTitleContainer: {
    flexDirection: 'row',
    padding: ScaleHelpers.CalcHeight(1),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',

    width: ScaleHelpers.CalcWidth(90),
    height: ScaleHelpers.CalcHeight(6),

    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },

  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(3.6),
    color: '#707070',
    fontFamily: fontType.bold,
  },
});

class TitleCard extends React.Component {
  render() {
    const text = this.props.text;
    return (
      <View style={styles.itemTitleContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.itemTitle}>{text}</Text>
        </View>
      </View>
    );
  }
}
export default TitleCard;
