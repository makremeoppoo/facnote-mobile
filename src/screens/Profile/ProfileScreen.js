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
import CabinetBackground from '../../../assets/images/CabinetBackground1.png';
import CabinetBackgroundTransparent from '../../../assets/images/CabinetBackgroundTransparent.png';

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
            source={CabinetBackground}
            style={styles.topImageStyle}></ImageBackground>
          <ImageBackground
            source={CabinetBackgroundTransparent}
            style={styles.topImageTransparentStyle}></ImageBackground>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nom de la Société</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.btn}
              onPress={() => this.callNumber('00000')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Text style={styles.btnTxt}>Appeler</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btn}
              onPress={() => this.sendMail()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Text style={styles.btnTxt}>Envoyer un email</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.cabinetImgContainer}>
            <Text style={styles.CabinerName}>Logo</Text>

             {/*<Image source={require('../../../assets/images/logo.png')} />*/} 
            </View>
            <Text style={styles.CabinerName}>Nom du cabinet</Text>
            <Text style={styles.CabinerInfo}>CP Rue Ville</Text>
            <Text style={styles.CabinerInfo}>Telephone 22 654 658</Text>

            <Text style={styles.CabinerInfo}>Fax 25 963 8896</Text>
          </View>
          <TouchableHighlight
            style={styles.btn}
            onPress={() => this.props.logout()}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.btnTxt}>Deconnecter</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps, {logout})(NotificationsScreen);
