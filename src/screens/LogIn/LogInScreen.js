/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  Keyboard,
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import LogoImage from '../../../assets/images/logo.png'
import BackgroundLoginImage from '../../../assets/images/background_connexion.png';

import * as api from '../../services/auth';
import {login} from '../../redux';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showButtom: true,
    };
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keshowButtomyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keshowButtomyboardDidShow = () => {
    this.setState({showButtom: !this.state.showButtom});
  };

  _keyboardDidHide = () => {
    this.setState({showButtom: !this.state.showButtom});
  };

  onPressLogButton = async () => {
    const {name, password} = this.state;
    try {
      let response = await api.login({name, password});

      //check if username is null
      let username = response.user.username !== null;
      console.log(response);

      this.props.login({user: {name, password}});
    } catch (error) {
      this.props.login({user: {name, password}});

      console.log(error.message);
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView >
          <Image
            source={BackgroundLoginImage}
            style={styles.topImageStyle}></Image>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>COMPTA SMART</Text>
            <Image
              style={styles.logo}
              source={LogoImage}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Identifiant</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Mot de passe</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.setState({password: text})}
                  value={this.state.password}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.buttonStyle}
                onPress={() => this.onPressLogButton()}>
                <Text style={styles.signTxt}>Connexion</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
        {this.state.showButtom && ( <View >
            <Text style={styles.buttomText}>
              mentions légales - CGU
            </Text>
          
        </View>)}
      </View>
    );
  }
}
export default connect(null, {login})(LoginScreen);
