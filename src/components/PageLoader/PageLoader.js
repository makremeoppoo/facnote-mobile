import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import ScaleHelpers from '../scaleHelpers';

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
          ...{backgroundColor: showBackground ? 'rgba(255,255,255,0.7)' : null},
        }}>
        <ActivityIndicator size="large" color={this.props.color} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    elevation: 11,
    position: 'absolute',
    height: ScaleHelpers.CalcHeight(100),
    width: ScaleHelpers.CalcWidth(100),
  },
});
