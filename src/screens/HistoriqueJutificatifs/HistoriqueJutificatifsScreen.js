/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import Background from '../../../assets/images/background-accueil-provisoir-2.png';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {user: null};
  }
  componentDidMount() {
    this.initData();
  }
  initData = async () => {

  };

  renderData = ({item}) => <Text style={{marginBottom: 2}}>{item}</Text>;

  render() {
    const {user} = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Background}
          style={styles.topImageStyle}></ImageBackground>
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>Nom de la Société</Text>
          <Text style={styles.text}>
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(HomeScreen);
