/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import {View, Image, Text, TouchableHighlight} from 'react-native';
import styles from './styles';

class CardView extends React.Component {
  render() {
    const item = this.props.item;
    return item.isTitle ? (
      <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)">
        <View style={styles.itemTitleContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.itemTitle}>{item.text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    ) : (
      <TouchableHighlight
        style={styles.itemContainer}
        //onPress={() => this.props.onPress()}
        underlayColor="rgba(128, 128, 128, 0.1)">
        <View style={styles.mainContainer}>
          <View style={styles.rowContainer}>
            <Image style={styles.itemIcon} source={item.icon} />
            <View style={styles.itemTxtContainer}>
              <Text style={styles.blueTitle}>{item.title}</Text>
            </View>
            <View style={styles.itemTxtContainer}>
              <Text style={styles.itemTitle}>{item.date}</Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amountItem}>{item.procent + ' €'}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
export default CardView;
