/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  ScrollView,
  Linking,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {logout} from '../../redux';
import CabinetBackground from '../../../assets/images/CabinetBackground1.png';
import CabinetBackgroundTransparent from '../../../assets/images/CabinetBackgroundTransparent.png';

class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  callNumber = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  sendMail = (email) => {
    Linking.openURL(`mailto:${email}?subject=Cabinet`);
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={CabinetBackground}
            style={styles.topImageStyle}></ImageBackground>
          <ImageBackground
            source={CabinetBackgroundTransparent}
            style={styles.topImageTransparentStyle}></ImageBackground>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nom de la Société</Text>
          </View>
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={() => this.sendMail('test@test.com')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.btnTxt}>Envoyer email</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={() => this.callNumber('00000')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.btnTxt}>Appeler</Text>
          </TouchableHighlight>
          <View style={styles.infoContainer}>
            <Image
              style={styles.cabinetImg}
              source={require('../../../assets/images/logo.png')}
            />
            <Text style={styles.CabinerName}>Adress</Text>
            <Text style={styles.CabinerInfo}>CP Rue Ville</Text>
            <Text style={styles.CabinerInfo}>Telephone 22 654 658</Text>

            <Text style={styles.CabinerInfo}>Fax 25 963 8896</Text>
          </View>
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={() => this.props.logout()}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.btnTxt}>Logout</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}
export default connect(null, {logout})(NotificationsScreen);
