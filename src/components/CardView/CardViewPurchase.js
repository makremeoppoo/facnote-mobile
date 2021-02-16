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
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

import {text} from '../../constants';

class CardView extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <Collapse>
        <CollapseHeader>
          {item.isTitle ? (
            <View style={styles.itemTitleContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>{item.text}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.mainContainer}>
              <View style={styles.rowContainer}>
                <TouchableHighlight
                  style={styles.itemIcon}
                  onPress={() => this.props.onShowPdfModal(item.url)}
                  underlayColor="rgba(73,182,77,1,0.9)">
                  <Icon
                    iconStyle={styles.iconRemoveFile}
                    reverse
                    type="ionicon"
                    color="rgb(92,117,254)"
                    name={'ios-attach'}
                    size={25}
                  />
                </TouchableHighlight>
                <View style={[styles.itemTxtContainer,{width:"40%"}]}>
                  <Text style={styles.blueTitle} numberOfLines={1}>{item.libelle}</Text>
                </View>
                <View style={styles.itemTxtContainer}>
                  <Text style={[styles.amountItem,{fontWeight:'bold'}]}>{item.dateEcheance}</Text>
                </View>
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.amountItem}>{item.journal}</Text>
              </View>
            </View>
          )}
        </CollapseHeader>
        {!item.isTitle ? (
          <CollapseBody>
            <View style={{alignItems: 'center'}}>
              <View style={styles.row}>
                <Text style={{...styles.blueItemText}}>{text.BillNumber}:</Text>
                <Text style={{...styles.itemText}}>{item.numFacture}</Text>
                <Text style={{...styles.blueItemText}}>{text.MontantTTC}:</Text>
                <Text style={{...styles.itemText}}>
                  {(item.ttc ? item.ttc : 0) + ' €'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={{...styles.blueItemText}}>HT:</Text>
                <Text style={{...styles.itemText}}>
                  {(item.ht ? item.ht : 0) + ' €'}
                </Text>
                <Text style={{...styles.blueItemText}}>TVA:</Text>
                <Text style={{...styles.itemText}}>
                  {(item.tva ? item.tva : 0) + ' €'}
                </Text>
              </View>
            </View>
          </CollapseBody>
        ) : (
          <></>
        )}
      </Collapse>
    );
  }
}
export default CardView;
