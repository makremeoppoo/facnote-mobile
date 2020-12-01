/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Linking,
  ImageBackground,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {logout} from '../../redux';
import Background from '../../../assets/images/background_accueil_ok.png';

class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cabinet: {},
    };
  }

  componentDidMount() {
    console.log('user', this.props.user);
    this.setState({cabinet: this.props.user.cabinet});
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

  sendMail = () => {
    Linking.openURL(`mailto:${this.state.cabinet.email}?subject=Cabinet`);
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={Background}
            style={styles.topImageStyle}></ImageBackground>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nom de la Société</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={{
                ...styles.btn,
                ...{
                  borderColor: 'rgba(46, 204, 113, 0.5)',
                  backgroundColor: 'rgba(46, 204, 113, 0.9)',
                },
              }}
              onPress={() => this.callNumber('00000')}>
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
              onPress={() => this.sendMail()}>
              <Text style={{...styles.btnTxt, ...{color: 'white'}}}>
                Envoyer un email
              </Text>
            </TouchableHighlight>
            <View style={styles.infoContainer}>
              <View style={styles.cabinetImgContainer}>
                <Image
                  style={styles.cabinetImg}
                  source={require('../../../assets/images/imgpsh_fullsize_anim.png')}
                />
              </View>
              <Text style={styles.CabinerName}>Nom du cabinet</Text>
              <Text style={styles.CabinerInfo}>CP Rue Ville</Text>
              <Text style={styles.CabinerInfo}>Telephone 22 654 658</Text>

              <Text style={styles.CabinerInfo}>Fax 25 963 8896</Text>
            </View>
            <TouchableHighlight
              style={{
                ...styles.btn,
                ...{borderColor: 'rgba(171, 183, 183, 1)', backgroundColor: 'rgba(171, 183, 183, 1)'},
              }}
              onPress={() => this.props.logout()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Text style={{...styles.btnTxt, ...{color: 'white'}}}>
                Deconnecter
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps, {logout})(NotificationsScreen);
