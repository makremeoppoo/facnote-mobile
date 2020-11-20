/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {user: null};
  }
  componentDidMount() {
    this.initData();
  }
  initData = async () => {};

  renderData = ({item}) => <Text style={{marginBottom: 2}}>{item}</Text>;

  render() {
    const {user} = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate('HistoriqueJutificatifs')
          }
          underlayColor="rgba(73,182,77,1,0.9)">
          <View style={styles.itemContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.itemTitle}>Filter</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(HomeScreen);
