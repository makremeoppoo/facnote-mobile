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
    width: ScaleHelpers.CalcWidth(60),
  },

  itemTxtContainer: {
    alignSelf: 'center',
    lineHeight: 34,
    marginLeft: ScaleHelpers.CalcWidth(5),
    marginRight: ScaleHelpers.CalcWidth(10),

  },
  libelle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: 'Nunito-Bold',
    color:"#707070"
  },
  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(3.6),
    color: '#707070',
    fontFamily: 'Nunito-Bold',
  },

  amountContainer: {
    height: ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(30),
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
  iconContainer: {
    alignSelf: 'center',
    lineHeight: 34,
    alignItems: 'center',
    paddingTop: ScaleHelpers.CalcWidth(3),
    borderRadius: ScaleHelpers.CalcWidth(10),
    width: ScaleHelpers.CalcWidth(12),
    height: ScaleHelpers.CalcWidth(12),
  },
});

class BankCard extends React.Component {
  
  renderIcon=()=> {
    if (
      this.props.item.associer == null &&
      this.props.item.justificatif &&
      this.props.item.facture_tag == null
    ) {
      return (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: 'rgb(92, 117, 254)',
            },
          ]}>
          <FontAwesomeIcon icon={faPlus} size={23} color="white" />
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
          style={[
            styles.iconContainer,
            {
              backgroundColor: '#FD3550',
            },
          ]}>
          <FontAwesomeIcon icon={faComments} size={23} color="white" />
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
          style={[
            styles.iconContainer,
            {
              backgroundColor: '#15CA20',
            },
          ]}>
          <FontAwesomeIcon icon={faComment} size={23} color="white" />
        </View>
      );
    }
    return (
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: '#15CA20',
          },
        ]}>
        <FontAwesomeIcon icon={faShoppingCart} size={23} color="white" />
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
          <View style={[styles.rowContainer]}>
            {this.renderIcon()}
            <View style={[styles.itemTxtContainer]}>
              <Text
                style={[
                  styles.libelle,
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
