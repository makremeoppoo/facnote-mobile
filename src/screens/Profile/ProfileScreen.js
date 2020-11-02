/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {logout} from '../../redux';

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
      <ScrollView style={styles.container}>
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
            style={styles.userImg}
            source={require('../../../assets/images/logo.png')}
          />
          <Text style={styles.userName}>Cabinet</Text>
        </View>
        <TouchableHighlight
          style={styles.btnContainer}
          onPress={() => this.props.logout()}
          underlayColor="rgba(73,182,77,1,0.9)">
          <Text style={styles.btnTxt}>Logout</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
export default connect(null, {logout})(NotificationsScreen);
