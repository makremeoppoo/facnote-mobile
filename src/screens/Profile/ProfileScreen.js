/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Linking,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {logout} from '../../redux';
import Background from '../../../assets/images/background_accueil_ok.png';

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
    const {cabinet} = this.props.user;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={Background}
          style={styles.topImageStyle}></ImageBackground>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{cabinet.cabinet.raison_sociale}</Text>
        </View>
        <ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={{
                ...styles.btn,
                ...{
                  borderColor: 'rgba(46, 204, 113, 0.5)',
                  backgroundColor: 'rgba(46, 204, 113, 0.9)',
                },
              }}
              onPress={() => this.callNumber(cabinet.fax)}>
              <Text style={{...styles.btnTxt, ...{color: 'white'}}}>
                Appeler
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...styles.btn,
                ...{
                  borderColor: 'rgba(92,117,254,0.5)',
                  backgroundColor: 'rgba(92,117,254,0.9)',
                },
              }}
              onPress={() => this.sendMail(cabinet.email)}>
              <Text style={{...styles.btnTxt, ...{color: 'white'}}}>
                Envoyer un email
              </Text>
            </TouchableHighlight>
            <View style={styles.infoContainer}>
              <View style={styles.cabinetImgContainer}>
                <ImageBackground
                  resizeMode={'contain'}
                  style={styles.cabinetImg}
                  source={
                    cabinet.logo1 != ''
                      ? {uri: cabinet.logo1}
                      : cabinet.logo2 != ''
                      ? {uri: cabinet.logo2}
                      : require('../../../assets/images/imgpsh_fullsize_anim.png')
                  }
                />
              </View>
              <Text style={styles.CabinerName}>
                {cabinet.cabinet.raison_sociale}
              </Text>
              <Text style={styles.CabinerInfo}>
                {cabinet.address.code_postale} {cabinet.address.adresse}{' '}
              </Text>
              <Text style={styles.CabinerInfo}>
                {cabinet.address.ville} {cabinet.address.pays}
              </Text>
            </View>
            <TouchableHighlight
              style={{
                ...styles.btn,
                ...{
                  borderColor: 'rgba(171, 183, 183, 1)',
                  backgroundColor: 'rgba(171, 183, 183, 1)',
                },
              }}
              onPress={() => this.props.logout()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Text style={{...styles.btnTxt, ...{color: 'white'}}}>
                Deconnecter
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps, {logout})(NotificationsScreen);
