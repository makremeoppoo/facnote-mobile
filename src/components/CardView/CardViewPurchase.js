/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, Image, TouchableHighlight} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Badge, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor} from '../../AppStyles';
import {text} from '../../constants';
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
    width: ScaleHelpers.CalcWidth(60),
  },
  libelle: {
    fontSize: ScaleHelpers.CalcWidth(4.5),
    color: '#707070',
    fontFamily: 'Nunito-Bold',
  },
  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(3.6),
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
    fontSize: ScaleHelpers.CalcWidth(4.5),
    color: '#707070',
    fontFamily: 'Nunito-Bold',
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
            <Icon
              iconStyle={styles.iconRemoveFile}
              reverse
              type="ionicon"
              color="rgb(92,117,254)"
              name={'ios-attach'}
              size={30}
            />
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
