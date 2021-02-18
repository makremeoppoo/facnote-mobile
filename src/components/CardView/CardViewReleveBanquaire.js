/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, TouchableHighlight} from 'react-native';

import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

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
        style={styles.mainReleveBancaireContainer}
        onPress={() => this.props.onShowModal(item.path)}
        underlayColor="rgba(73,182,77,1,0.9)">
        <View style={styles.mainReleveBancaireContainer}>
          <View style={styles.rowContainer}>
            <Icon
              iconStyle={styles.iconRemoveFile}
              reverse
              type="ionicon"
              color="rgb(92,117,254)"
              name={'ios-create-sharp'}
              size={25}
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
