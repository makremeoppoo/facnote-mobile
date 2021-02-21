/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, TouchableHighlight} from 'react-native';

import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ScaleHelpers from '../../components/scaleHelpers';
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
    borderColor: 'rgba(214, 214, 214, 1)',
    borderTopWidth: 0.5,
    
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
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
  },
  blueTitle: {
    fontSize: ScaleHelpers.CalcWidth(3.6),
    color: 'rgb( 92,117,254)',
    fontFamily: 'Nunito-Bold',
    margin: ScaleHelpers.CalcWidth(0),
  },
  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(3.6),
    color: 'rgb(112,112,112)',
    fontFamily: 'Nunito-Bold',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
 
  },

  itemText: {
    fontSize: ScaleHelpers.CalcWidth(3.7),
    fontFamily: 'Nunito-Bold',
    color: '#7f7d80',
    minWidth: ScaleHelpers.CalcWidth(24),
    maxWidth: ScaleHelpers.CalcWidth(24),
  },
  blueItemText: {
    fontSize: ScaleHelpers.CalcWidth(3.6),
    color: 'rgb( 92,117,254)',
    fontFamily: 'Nunito-Bold',
    minWidth: ScaleHelpers.CalcWidth(14),
    maxWidth: ScaleHelpers.CalcWidth(14),
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
    color: 'rgb(112,112,112)',
    fontSize: ScaleHelpers.CalcWidth(3.6),
    fontFamily: 'Nunito-Bold',
  },
  labelReleveBancaire: {
    fontSize: ScaleHelpers.CalcWidth(3.6),
    width: ScaleHelpers.CalcWidth(50),
    color: 'rgb( 92,117,254)',
    fontFamily: 'Nunito-Bold',
  },
  soldeContainer: {
    alignItems: 'flex-end',
    color: 'rgb(112,112,112)',
    fontFamily: 'Nunito-Bold',
  },
  libelleRelBanquaireContainer: {
    alignItems: 'flex-start',
    margin: ScaleHelpers.CalcWidth(1),
    lineHeight: 34,
  },
 
});



class CardView extends React.Component {
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
        <View style={styles.mainContainer}>
          <View style={styles.rowContainer}>
            <Icon
              iconStyle={styles.iconRemoveFile}
              reverse
              type="ionicon"
              color="rgb(92,117,254)"
              name={'ios-help-circle'}
              size={50}
            />
            <View style={styles.itemTxtContainer}></View>
            <View style={styles.libelleRelBanquaireContainer}>
              <Text numberOfLines={1} style={styles.labelReleveBancaire}>
                {item.libelle}
              </Text>
              <Text style={styles.amountItem}>{item.nom_banque}</Text>
            </View>
          </View>
          <View style={styles.soldeContainer}>
            <Text style={styles.amountItem}>
              {item.value + ' €'}
            </Text>
            <Text style={styles.amountItem}>
              Solde : {(item.solde ? item.solde : 0) + ' €'}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
export default CardView;
