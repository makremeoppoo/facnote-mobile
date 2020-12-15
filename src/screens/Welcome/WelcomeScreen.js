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

          <ImageBackground
            source={backgroundWelcomeImage}
            style={styles.topImageStyle}></ImageBackground>
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

          <View
            style={{
              bottom: 0,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text onPress={() => Linking.openURL('https://facnote.com/fr/cgu.html')} style={styles.buttomText}>mentions légales - CGU</Text>
          </View>
        </View>
    );
  }
}
