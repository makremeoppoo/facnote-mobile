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
        <View style={styles.infoContainer}>
          <Image
            style={styles.userImg}
            source={require('../../../assets/images/logo.png')}
          />
          <Text style={styles.userName}>Cabinet</Text>
        </View>
        <View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('AccountDetails')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Image
                  style={styles.itemIcon}
                  source={require('../../../assets/icons/account.png')}
                />
                <Text style={styles.itemTitle}>Account Details</Text>
              </View>
              <Image
                style={styles.rightArrow}
                source={require('../../../assets/icons/rightArrow.png')}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             onPress={() => { this.callNumber("+49 89 382 79189") }}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Image
                  style={styles.itemIcon}
                  source={require('../../../assets/icons/call.png')}
                />
                <Text style={styles.itemTitle}>Contacter nous</Text>
              </View>
              <Image
                style={styles.rightArrow}
                source={require('../../../assets/icons/rightArrow.png')}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             onPress={() => { this.sendMail("starnext-appteam@list.bmw.com") }}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>

                <Image
                  style={styles.itemIcon}
                  source={require('../../../assets/icons/call.png')}
                />
                <Text style={styles.itemTitle}>Envoyer Email</Text>
              </View>
              <Image
                style={styles.rightArrow}
                source={require('../../../assets/icons/rightArrow.png')}
              />
            </View>
          </TouchableHighlight>
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
