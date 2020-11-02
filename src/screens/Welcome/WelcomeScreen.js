/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import ButtomImage from '../../../assets/images/identificationButtomImage.png';
import backgroundWelcomeImage from '../../../assets/images/backgroundWelcome.png';

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressLogButton = () => {
    this.props.navigation.navigate('LogIn');
  };

  render() {
    return (
      <View style={styles.container}> 
      <ScrollView >
        <ImageBackground
          source={backgroundWelcomeImage}
          style={styles.topImageStyle}></ImageBackground>
        <View >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>COMPTA SMART</Text>
            <Text style={styles.description}></Text>
          </View>
          <View style={styles.logContainer}>
            <TouchableHighlight
              style={styles.signupContainer}
              onPress={() => this.onPressLogButton()}>
              <Text style={styles.signTxt}>Vous identfier</Text>
            </TouchableHighlight>
          </View>
          <View >
            <Image style={styles.image} source={ButtomImage} />
          </View>
          
        </View>
      </ScrollView>
      <View
      style={{
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <Text style={styles.buttomText}>
        mentions légales - CGU
      </Text>
    </View>
    </View>
    );
  }
}
