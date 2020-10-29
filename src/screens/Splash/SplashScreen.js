/* eslint-disable comma-dangle */
import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import styles from './styles';

export default class SplashScreen extends React.Component {
  
  timer = null;

  constructor(props) {
    super(props);
  }
  

    componentDidMount() {
      this.timer = setTimeout(() =>  this.props.navigation.navigate('Welcome'), 1000)
    }
    
    componentWillUnmount() {
      clearTimeout(this.timer);
    }
  

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Onboarding')}
          underlayColor="rgba(73,182,77,1,0.1)"
        >
          <Image style={styles.logo} source={require('../../../assets/images/logo.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}
