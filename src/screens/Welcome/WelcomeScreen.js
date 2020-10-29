/* eslint-disable comma-dangle */
import React from 'react';
import { View, Image, TouchableHighlight, Text, ScrollView,  ImageBackground,
} from 'react-native';
import styles from './styles';
import image1 from "../../../assets/images/imgpsh_fullsize_anim.png"
import image2 from "../../../assets/images/backgroundLogin.png"

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressLogButton = () => {
    this.props.navigation.navigate('LogIn');
  };



  render() {
    return (
      <ScrollView style={styles.container}>
         <ImageBackground
              source={image2}
              style={styles.topImageStyle}
            ></ImageBackground>
        <View style={styles.mainContainer}>
       
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Compta Smart</Text>
            <Text style={styles.description}></Text>
          </View>
          <View style={styles.logContainer}>
           
            <TouchableHighlight
              style={styles.signupContainer}
              onPress={() => this.onPressLogButton()}
            >
              <Text style={styles.signTxt}>Vous identfier</Text>
            </TouchableHighlight>
          </View>
          <Image style={styles.image} source={image1} />

        </View>
      </ScrollView>
    );
  }
}
