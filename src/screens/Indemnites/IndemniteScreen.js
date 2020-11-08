/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Linking,
  TextInput,
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Indemnités Kilométriques</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Date</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Puissance Administrative</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Distance parcourue(KM)</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Lieu de départ</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Lieu d'arrivée</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Client ou motif</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                />
              </View>
            </View>
          </View>
          <View style={styles.ButtonsContain}>
            <TouchableHighlight
              style={styles.btnContainer}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Text style={styles.btnTxt}>Annuler</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnContainer}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Text style={styles.btnTxt}>Valider</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default connect(null, {logout})(NotificationsScreen);
