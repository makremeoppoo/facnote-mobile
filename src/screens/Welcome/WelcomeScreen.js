/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  ImageBackground,
  Linking
} from 'react-native';
import styles from './styles';
import LogoImage from '../../../assets/images/logo.png'

import backgroundWelcomeImage from '../../../assets/images/backgroundWelcome.png';

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressLogButton = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View >

        <ScrollView >
        <View style={styles.container}>

          <Image
            source={backgroundWelcomeImage}
            style={styles.topImageStyle}></Image>
          <View>
            <View style={styles.titleContainer}>
            <Image
              style={styles.logo}
              source={LogoImage}
            />
            </View>
            <View style={styles.buttonView}>
              <TouchableHighlight
                style={styles.buttonContainer}
                onPress={() => this.onPressLogButton()}>
                <Text style={styles.buttonTxt}>Vous identfier</Text>
              </TouchableHighlight>
            </View>
          </View>
          </View>
          </ScrollView>

          <View style={styles.buttomView}>
            <Text
              style={[styles.buttomText, {color: 'rgb(92,117,254)'}]}
              onPress={() =>
                Linking.openURL('https://facnote.com/fr/mentions.html')
              }>
              mentions légales
            </Text>
            <Text style={[styles.buttomText, {color: 'rgb(92,117,254)'}]}>
              {' '}
              -{' '}
            </Text>
            <Text
              onPress={() =>
                Linking.openURL('https://facnote.com/fr/cgu.html')
              }
              style={[styles.buttomText, {color: 'rgb(92,117,254)'}]}>
              {' '}
              CGU
            </Text>
          </View>
        
        </View>
    );
  }
}
