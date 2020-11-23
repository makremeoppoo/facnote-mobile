/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  Image,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import Background from '../../../assets/images/background_accueil_ok.png';
import rightArrow from '../../../assets/icons/Icone_détails.png';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {user: null};
  }
  componentDidMount() {
    this.initData();
  }
  initData = async () => {
    console.log('user', this.props.user);
  };

  renderData = ({item}) => <Text style={{marginBottom: 2}}>{item}</Text>;

  render() {
    const {user} = this.props;
    return (
      <ScrollView>

      <View style={styles.container}>
        <ImageBackground
          source={Background}
          style={styles.topImageStyle}></ImageBackground>
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>Hello Prénom 👋</Text>
        </View>
        <View>

 <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Profile')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>Solde de trésorerie</Text>
                <Text style={styles.itemTitle2}>Mensuel</Text>
                <Text style={styles.itemTitleBold}>33 711 €</Text>
              </View>
              <Image style={styles.rightArrow} source={rightArrow} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Profile')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainerBleu}>
              <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>Charges de personnel</Text>
                <Text style={styles.itemTitle2}>Mensuel</Text>
                <Text style={styles.itemTitleBold}>33 711 €</Text>
              </View>
              <Image style={styles.rightArrow} source={rightArrow} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Profile')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>Solde de trésorerie</Text>
                <Text style={styles.itemTitle2}>Mensuel</Text>
                <Text style={styles.itemTitleBold}>33 711 €</Text>
              </View>
              <Image style={styles.rightArrow} source={rightArrow} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Profile')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <View style={styles.itemContainerBleu}>
              <View style={styles.rowContainer}>
                <Text style={styles.itemTitle}>Charges de personnel</Text>
                <Text style={styles.itemTitle2}>Mensuel</Text>
                <Text style={styles.itemTitleBold}>33 711 €</Text>
              </View>
              <Image style={styles.rightArrow} source={rightArrow} />
            </View>
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
export default connect(mapStateToProps)(HomeScreen);
