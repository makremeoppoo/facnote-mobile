/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  ImageBackground,
  Linking,
} from 'react-native';
import styles from './styles';
import LogoImage from '../../../assets/images/logo.png';
import {text, routes} from '../../constants';

import backgroundWelcomeImage from '../../../assets/images/backgroundWelcome.png';

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressLogButton = () => {
    this.props.navigation.navigate(routes.Login);
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={backgroundWelcomeImage}
              style={styles.topImageStyle}></Image>
            <View>
              <View style={styles.titleContainer}>
                <Image style={styles.logo} source={LogoImage} />
              </View>
              <View style={styles.buttonView}>
                <TouchableHighlight
                  style={styles.buttonContainer}
                  underlayColor="rgba(73,182,77,1,0.9)"
                  onPress={() => this.onPressLogButton()}>
                  <Text style={styles.buttonTxt}>{text.identifier}</Text>
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
            {text.mentionsLegales}
          </Text>
          <Text style={[styles.buttomText, {color: 'rgb(92,117,254)'}]}>
            {' '}
            -{' '}
          </Text>
          <Text
            onPress={() => Linking.openURL('https://facnote.com/fr/cgu.html')}
            style={[styles.buttomText, {color: 'rgb(92,117,254)'}]}>
            {' '}
            {text.CGU}
          </Text>
        </View>
      </View>
    );
  }
}
