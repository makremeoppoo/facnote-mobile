/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, TouchableHighlight} from 'react-native';

import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faShoppingCart,
  faComment,
  faComments,
} from '@fortawesome/free-solid-svg-icons';

import ScaleHelpers from '../scaleHelpers';
import {textColor, buttonColor} from '../../AppStyles';
/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';

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
    height: ScaleHelpers.CalcHeight(5),

    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    marginBottom: ScaleHelpers.CalcWidth(1),
  },
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

  itemTxtContainer: {
    alignSelf: 'center',
    margin: ScaleHelpers.CalcWidth(1),
    lineHeight: 34,
    width: ScaleHelpers.CalcWidth(50),
  },
  libelle: {
    fontSize: ScaleHelpers.CalcWidth(4.5),
    fontFamily: 'Nunito-Bold',
  },
  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(3.6),
    color: '#707070',
    fontFamily: 'Nunito-Bold',
  },

  amountContainer: {
    height: ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(25),
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  amountItem: {
    textAlign: 'center',
    fontSize: ScaleHelpers.CalcWidth(4.5),
    color: '#707070',
    fontFamily: 'Nunito-Bold',
  },
});

class BankCard extends React.Component {
  renderIcon() {
    if (
      this.props.item.associer == null &&
      this.props.item.justificatif &&
      this.props.item.facture_tag == null
    ) {
      return (
        <View
          style={{
            alignSelf: 'center',
            margin: ScaleHelpers.CalcWidth(1),
            lineHeight: 34,
            alignItems: 'center',
            paddingTop: ScaleHelpers.CalcWidth(4),
            backgroundColor: "rgb(92, 117, 254)",
            borderRadius: ScaleHelpers.CalcWidth(10),
            width: ScaleHelpers.CalcWidth(15),
            height: ScaleHelpers.CalcWidth(15),
          }}>
          <FontAwesomeIcon icon={faPlus} size={30} color="white" />
        </View>
      );
    }

    if (
      this.props.item.associer == null &&
      this.props.item.etat_commentaire == 3 &&
      this.props.item.facture_tag !== null
    ) {
      return (
        <View
          style={{
            alignSelf: 'center',
            margin: ScaleHelpers.CalcWidth(1),
            lineHeight: 34,
            alignItems: 'center',
            paddingTop: ScaleHelpers.CalcWidth(4),
            backgroundColor: '#FD3550',
            borderRadius: ScaleHelpers.CalcWidth(10),
            width: ScaleHelpers.CalcWidth(15),
            height: ScaleHelpers.CalcWidth(15),
          }}>
          <FontAwesomeIcon icon={faComments} size={30} color="white" />
        </View>
      );
    }

    if (
      this.props.item.associer == null &&
      (this.props.item.etat_commentaire == 4 ||
        this.props.item.etat_commentaire == 5) &&
      this.props.item.facture_tag !== null
    ) {
      return (
        <View
          style={{
            alignSelf: 'center',
            margin: ScaleHelpers.CalcWidth(1),
            lineHeight: 34,
            alignItems: 'center',
            paddingTop: ScaleHelpers.CalcWidth(4),
            backgroundColor: '#15CA20',
            borderRadius: ScaleHelpers.CalcWidth(10),
            width: ScaleHelpers.CalcWidth(15),
            height: ScaleHelpers.CalcWidth(15),
          }}>
          <FontAwesomeIcon icon={faComment} size={30} color="white" />
        </View>
      );
    }
    return (
      <View
        style={{
          alignSelf: 'center',
          margin: ScaleHelpers.CalcWidth(1),
          lineHeight: 34,
          alignItems: 'center',
          paddingTop: ScaleHelpers.CalcWidth(4),
          backgroundColor: '#15CA20',
          borderRadius: ScaleHelpers.CalcWidth(10),
          width: ScaleHelpers.CalcWidth(15),
          height: ScaleHelpers.CalcWidth(15),
        }}>
        <FontAwesomeIcon icon={faShoppingCart} size={30} color="white" />
      </View>
    );
  }
  render() {
    const item = this.props.item;
    return item.isTitle ? (
      <View style={styles.itemTitleContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.itemTitle}>{item.text}</Text>
        </View>
      </View>
    ) : (
      <TouchableHighlight
        style={styles.mainContainer}
        onPress={() => this.props.onShowModal(item.path)}
        underlayColor="rgba(73,182,77,1,0.9)">
        <View
          style={[styles.mainContainer, item.counter > 1 ? styles.border : {}]}>
          <View
            style={[
              styles.rowContainer,
             
            ]}>
            {this.renderIcon()}
            <View style={[styles.itemTxtContainer]}>
              <Text
                style={[
                  styles.libelle,
                  ,
                  {color: item.icon == 'ios-cart' ? item.color : '#707070'},
                ]}
                numberOfLines={1}>
                {item.libelle}
              </Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountItem}>{item.value + ' €'}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
export default BankCard;
