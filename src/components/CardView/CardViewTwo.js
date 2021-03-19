/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, Image, TouchableHighlight} from 'react-native';

import {Badge, Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../scaleHelpers';
import TitleCard from './TitleCard';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLink} from '@fortawesome/free-solid-svg-icons';
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    borderColor: 'rgba(214, 214, 214, 1)',
    borderTopWidth: 1,
  },

  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    height: ScaleHelpers.CalcHeight(10),
  },
  itemIcon: {
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(7),
    height: ScaleHelpers.CalcWidth(7),
    marginRight: ScaleHelpers.CalcWidth(1),
    marginLeft: ScaleHelpers.CalcWidth(1),
    //lineHeight: 30
  },
  itemTxtContainer: {
    alignSelf: 'center',
    margin: ScaleHelpers.CalcWidth(1),
    lineHeight: 34,
    width: ScaleHelpers.CalcWidth(55),
  },
  libelle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    color: '#707070',
    fontFamily: 'Nunito-Bold',
  },
  amountContainer: {
    height: ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(20),
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  amountItem: {
    textAlign: 'center',
    fontSize: ScaleHelpers.CalcWidth(4),
    color: '#707070',
    fontFamily: 'Nunito-Bold',
  },
});
class CardView extends React.Component {
  render() {
    const item = this.props.item;
    return item.isTitle ? (
      <TitleCard text={item.text}></TitleCard>
    ) : (
      <View
        style={[styles.mainContainer, item.counter > 1 ? styles.border : {}]}>
        <View style={styles.rowContainer}>
          <View style={[styles.itemTxtContainer]}>
            <Text style={styles.libelle} numberOfLines={1}>
              {item.libelle}
            </Text>
          </View>
          <TouchableHighlight
            style={styles.itemIcon}
            onPress={() => this.props.onShowPdfModal(item)}
            underlayColor="rgba(73,182,77,1,0.9)">
            <FontAwesomeIcon icon={faLink} size={23} color="#4EC6F5" />
          </TouchableHighlight>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountItem}>{item.TTC + ' €'}</Text>
        </View>
      </View>
    );
  }
}
export default CardView;
