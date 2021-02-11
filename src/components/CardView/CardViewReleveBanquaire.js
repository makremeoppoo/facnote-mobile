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
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {text} from '../../constants';

const StatusHistory = {
  1: 'primary',
  2: 'warning',
  3: 'success',
  5: 'error',
};
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
      <View style={styles.mainReleveBancaireContainer}>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            style={styles.itemIcon}
            onPress={() => this.props.onShowModal(item.path)}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Icon
              iconStyle={styles.iconRemoveFile}
              reverse
              type="ionicon"
              color="blue"
              name={'ios-add-circle'}
              size={25}
            />
          </TouchableHighlight>
          <View style={styles.itemTxtContainer}></View>
          <View style={styles.libelleRelBanquaireContainer}>
            <Text numberOfLines={1} style={styles.labelReleveBancaire}>
              {item.libelle}
            </Text>
            <Text style={styles.amountItem}>banque</Text>
          </View>
        </View>
        <View style={styles.soldeContainer}>
          <Text style={styles.amountItem}>
            {(item.procent ? item.procent : 0) + ' €'}
          </Text>
          <Text style={styles.amountItem}>
            Solde : {(item.procent ? item.procent : 0) + ' €'}
          </Text>
        </View>
      </View>
    );
  }
}
export default CardView;
