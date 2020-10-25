/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

import * as api from '../../services/auth';
import { login } from '../../redux';

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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.container}>
          <View>
            <Text style={styles.title}>Sign in</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email or phone number"
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
              />
            </View>
            <View style={styles.logContainer}>
              <TouchableHighlight
                style={styles.loginContainer}
                onPress={() => this.onPressLogButton()}>
                <Text style={styles.logTxt}>Log in</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
export default connect(null, { login })(LoginScreen);
