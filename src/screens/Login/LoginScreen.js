/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import LogoImage from '../../../assets/images/logo.png';
import BackgroundLoginImage from '../../../assets/images/background_connexion.png';

import * as api from '../../services/auth';
import {login} from '../../redux';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      error: '',
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

    try {
      //check if username is null
      // let username = response.user.username !== null;
      let user = await api.login({username: name, password: password});
      console.log(user);
      await AsyncStorage.setItem('accessToken', user['token']);

      let cabinet = await api.getCabinet();
      this.props.login({user: user['user'], cabinet: cabinet});
    } catch (error) {
      this.setState({error: 'Identifiant ou le mot de passe est incorrect !'});
      console.log(error.message);
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <Image
            source={BackgroundLoginImage}
            style={styles.topImageStyle}></Image>
          <View style={styles.titleContainer}>
            <Image style={styles.logo} source={LogoImage} />
            <Text style={styles.error}>{this.state.error}</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Identifiant</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.setState({name: text})}
                  value={this.state.name}
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Mot de passe</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
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
        {this.state.showButtom && (
          <View>
            <Text style={styles.buttomText}>mentions légales - CGU</Text>
          </View>
        )}
      </View>
    );
  }
}
export default connect(null, {login})(LoginScreen);
