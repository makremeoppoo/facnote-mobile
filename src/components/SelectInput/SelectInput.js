import React, {Component} from 'react';
import {StyleSheet, Text, Platform, View} from 'react-native';
import {Picker, PickerIOS} from '@react-native-community/picker';

import ScaleHelpers from '../scaleHelpers';
import {textColor, buttonColor, label} from '../../AppStyles';
export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderError() {
    const {errorLabel} = this.props;
    if (errorLabel) {
      return (
        <View>
          <Text style={styles.error}>{errorLabel}</Text>
        </View>
      );
    }
    return null;
  }
  render() {
    const {label, errorLabel} = this.props;
    return (
      <View style={styles.inputBlock}>
        <Text
          style={{...styles.label, ...{color: errorLabel ? 'red' : textColor}}}>
          {label}
        </Text>

        <View style={styles.inputContainer}>
          {Platform.OS === 'ios' ? (
            <PickerIOS {...this.props}>
              {this.props.listItems.map((e) => (
                <PickerIOS.Item
                  label={e.label}
                  value={e.value}></PickerIOS.Item>
              ))}
            </PickerIOS>
          ) : (
            <Picker {...this.props}>
              {this.props.listItems.map((e) => (
                <Picker.Item label={e.label} value={e.value}></Picker.Item>
              ))}
            </Picker>
          )}

          {this.renderError()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  error: {
    position: 'relative',
    height: ScaleHelpers.CalcHeight(2),
    marginTop: ScaleHelpers.CalcHeight(1),
    marginBottom: ScaleHelpers.CalcHeight(2),

    color: 'red',
    fontSize: 12,
  },
  inputContainer: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,

    paddingLeft: 10,
    height: ScaleHelpers.CalcHeight(7),
    width: ScaleHelpers.CalcWidth(80),
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  inputBlock: {
    height: ScaleHelpers.CalcHeight(13),
  },
  label: {
    fontFamily: 'Nunito-Regular',
    margin: ScaleHelpers.CalcWidth(2),
    color: textColor,
    fontSize: 12,
  },
});
