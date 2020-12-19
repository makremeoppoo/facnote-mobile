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
  ActivityIndicator,
  Linking,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import moment from 'moment';

import styles from './styles';
import {connect} from 'react-redux';
import LogoImage from '../../../assets/images/logo.png';
import BackgroundLoginImage from '../../../assets/images/background_connexion.png';

import * as api from '../../services/auth';
import getCabinet from '../../services/cabinet';
import getSociety from '../../services/societe';

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
      loading: false,
      rememberMe: false,
    };
  }
  async componentDidMount() {
    const name = await AsyncStorage.getItem('name');
    const password = await AsyncStorage.getItem('password');
    const rememberMe = await AsyncStorage.getItem('rememberMe');

    this.setState({
      name: name || '',
      password: password || '',
      rememberMe: rememberMe ? true : false,
    });
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
    const {name, password, rememberMe} = this.state;

    try {
      //check if username is null
      // let username = response.user.username !== null;
      this.setState({loading: true});
      let user = await api.login({username: name, password: password});
      await AsyncStorage.setItem('accessToken', user['token']);
      await AsyncStorage.setItem('loginDate', moment().unix().toString());

      let cabinet = await getCabinet();
      let society = await getSociety();
      this.props.login({
        user: user['user'],
        cabinet: cabinet,
        society: society,
      });
      this.setState({loading: false});
      if (rememberMe) {
        AsyncStorage.setItem('password', password);
        AsyncStorage.setItem('name', name);
        AsyncStorage.setItem('rememberMe', 'true');
      } else {
        AsyncStorage.removeItem('name');
        AsyncStorage.removeItem('password');
        AsyncStorage.removeItem('rememberMe');
      }
    } catch (error) {
      this.setState({
        error: 'identifiant ou mot de passe incorrect !',
        loading: false,
      });
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
          {this.state.loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
          <View style={styles.titleContainer}>
            <Image style={styles.logo} source={LogoImage} />
            <Text style={styles.error}>{this.state.error}</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Identifiant</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  autoCompleteType={'name'}
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
                  autoCompleteType={'password'}
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({password: text})}
                  value={this.state.password}
                />
              </View>
            </View>
            <CheckBox
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxLabel}
              checkedColor={'white'}
              uncheckedColor={'white'}
              title="Enregistrer mes identifiants"
              style={styles.checkbox}
              checked={this.state.rememberMe}
              onPress={(value) =>
                this.setState({rememberMe: !this.state.rememberMe})
              }
            />

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
          <View style={styles.buttomView}>
            <Text
              style={[styles.buttomText, {color: 'rgb(92,117,254)'}]}
              onPress={() =>
                Linking.openURL('https://facnote.com/fr/mentions.html')
              }>
              mentions légales
            </Text>
            <Text style={[styles.buttomText, {color: 'rgb(92,117,254)'}]}>
              {' '}
              -{' '}
            </Text>
            <Text
              onPress={() =>
                Linking.openURL('https://facnote.com/fr/cgu.html')
              }
              style={[styles.buttomText, {color: 'rgb(92,117,254)'}]}>
              {' '}
              CGU
            </Text>
          </View>
        )}
      </View>
    );
  }
}
export default connect(null, {login})(LoginScreen);
