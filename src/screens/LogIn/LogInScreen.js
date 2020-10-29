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
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import image1 from '../../../assets/images/logo.png';

import image2 from '../../../assets/images/BackgroundLogin.png';

import * as api from '../../services/auth';
import {login} from '../../redux';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

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
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <ImageBackground
            source={image2}
            style={styles.topImageStyle}></ImageBackground>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>COMPTA SMART</Text>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/logo.png')}
            />
          </View>
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
          <View style={styles.logContainer}>
            <TouchableHighlight
              style={styles.signupContainer}
              onPress={() => this.onPressLogButton()}>
              <Text style={styles.signTxt}>Connexion</Text>
            </TouchableHighlight>
          </View>
          <View
            style={{marginTop: 20, alignSelf: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'rgba(112,112,112,1)'}}>mentions légales - CGU</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default connect(null, {login})(LoginScreen);
