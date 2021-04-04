import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import ScaleHelpers from '../../Theme/scaleHelpers';

export default class PageLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {showBackground} = this.props;
    return (
      <View
        style={{
          ...styles.loader,
          ...{backgroundColor: showBackground ? 'rgba(255,255,255,0.8)' : null ,borderRadius:15},
        }}>
        <ActivityIndicator size="large" color={this.props.color} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loader: {
    alignSelf: 'center',
    position: 'absolute',
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
