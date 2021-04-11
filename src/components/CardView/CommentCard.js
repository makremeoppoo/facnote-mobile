/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View} from 'react-native';

import {Text} from 'react-native-elements';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {fontType} from '../../Theme/AppStyles';

/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: ScaleHelpers.CalcWidth(80),
    height: ScaleHelpers.CalcHeight(8),
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  time: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: fontType.bold,
    color: '#707070',
  },
  name: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: fontType.bold,
    color: '#707070',
  },
  comment: {
    fontSize: ScaleHelpers.CalcWidth(3.5),
    fontFamily: fontType.base,
    color: '#707070',
  },
});

class CommentCard extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.name}>{item.user_name}</Text>
            <Text style={styles.time}>
              {moment(item.updated_at).format('DD/MM/YYYY')}
            </Text>
          </View>
          <Text style={styles.comment} rkType="primary3 mediumLine">
            {item.comment}
          </Text>
        </View>
      </View>
    );
  }
}
export default CommentCard;
