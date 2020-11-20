/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import CabinetBackground from '../../../assets/images/Rectangle.png';
import rightArrow from '../../../assets/icons/rightArrow.png';
import Polygone from '../../../assets/icons/Polygone.png';

export default class MoreScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Image
            source={CabinetBackground}
            style={styles.topImageStyle}></Image>
          <View style={styles.header}>
            <Image style={styles.polygonImg} source={Polygone} />
            <Text style={styles.headerBigText}>Prénom Nom</Text>

            <Text style={styles.headerText}>Voir mon profile</Text>
          </View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('News')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.cabinetCard}>
              <Image
                style={styles.leftArrow}
                source={require('../../../assets/icons/profiel.png')}
              />
              <View style={styles.cabinetrowContainer}>
                <Text style={styles.itemTitle}>Nom de la SOCIETE</Text>
                <Text style={styles.itemTitle2}>Voire SOCIETE</Text>
              </View>
            </View>
          </TouchableHighlight>

          <View style={styles.content}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('News')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.itemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.itemTitle}>
                    Historique des justificatifs
                  </Text>
                </View>
                <Image style={styles.rightArrow} source={rightArrow} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Notifications')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.itemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.itemTitle}>Relevés bancaires</Text>
                </View>
                <Image style={styles.rightArrow} source={rightArrow} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Profile')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.itemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.itemTitle}>Mes achats</Text>
                </View>
                <Image style={styles.rightArrow} source={rightArrow} />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Profile')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.itemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.itemTitle}>Mes ventes</Text>
                </View>
                <Image style={styles.rightArrow} source={rightArrow} />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Profile')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.itemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.itemTitle}>Notes de frais</Text>
                </View>
                <Image style={styles.rightArrow} source={rightArrow} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Profile')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.itemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.itemTitle}>GED</Text>
                </View>
                <Image style={styles.rightArrow} source={rightArrow} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}
