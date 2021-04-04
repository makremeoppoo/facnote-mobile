import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import ScaleHelpers from '../scaleHelpers';
import {textColor, buttonColor, label} from '../../Theme/AppStyles';
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
    const {label, errorLabel, selectedValue} = this.props;
    return (
      <View style={styles.inputBlock}>
        <Text
          style={{...styles.label, ...{color: errorLabel ? 'red' : textColor}}}>
          {label}
        </Text>

        <View style={styles.inputContainer}>
          <ModalSelector
            cancelText={'Fermer'}
            data={this.props.listItems}
            {...this.props}>
            <TextInput
              style={{
                color: 'grey',
                width: '100%',
                height: '100%',
              }}
              editable={false}
              placeholder=""
              value={selectedValue}
            />
          </ModalSelector>

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
    fontFamily: 'Nunito-Bold',
    margin: ScaleHelpers.CalcWidth(2),
    color: textColor,
    fontSize: 12,
  },
});
