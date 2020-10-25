/* eslint-disable comma-dangle */
import React from 'react';
import { View, TouchableHighlight, Text, Image, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { logout } from '../../redux';

 class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);

  
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <Image style={styles.userImg} source={require('../../../assets/images/userImg.jpg')} />
          <Text style={styles.userName}>Adrian Smith</Text>
        </View>
        <View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('AccountDetails')}
            underlayColor="rgba(73,182,77,1,0.9)"
          >
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Image
                  style={styles.itemIcon}
                  source={require('../../../assets/icons/account.png')}
                />
                <Text style={styles.itemTitle}>Account Details</Text>
              </View>
              <Image
                style={styles.rightArrow}
                source={require('../../../assets/icons/rightArrow.png')}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Settings')}
            underlayColor="rgba(73,182,77,1,0.9)"
          >
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Image
                  style={styles.itemIcon}
                  source={require('../../../assets/icons/settings.png')}
                />
                <Text style={styles.itemTitle}>Settings</Text>
              </View>
              <Image
                style={styles.rightArrow}
                source={require('../../../assets/icons/rightArrow.png')}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('')}
            underlayColor="rgba(73,182,77,1,0.9)"
          >
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Image style={styles.itemIcon} source={require('../../../assets/icons/call.png')} />
                <Text style={styles.itemTitle}>Contact Us</Text>
              </View>
              <Image
                style={styles.rightArrow}
                source={require('../../../assets/icons/rightArrow.png')}
              />
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={styles.btnContainer}
          onPress={() => this.props.logout()}
          underlayColor="rgba(73,182,77,1,0.9)"
        >
          <Text style={styles.btnTxt}>Logout</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
export default connect(null, { logout })(NotificationsScreen);

