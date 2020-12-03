import React from 'react';
import {
  Platform,
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ScaleHelpers from '../scaleHelpers';

class DatePicker extends React.Component {
  state = {
    dateString: '',
    date: this.props.date || new Date(),
    show: false,
  };
  onChange = async (event, selectedDate) => {
    await this.setState({
      dateString: moment(selectedDate).format('DD/MM/YYYY'),
      date: selectedDate,
      show: false,
    });
  };

  showOverlay = () => {
    this.setState({show: true});
  };
  hideOverlay = () => {
    this.setState({show: false});
  };
  render() {
    return (
      <View style={{flex: 1, borderRadius: 100}}>
        <TouchableOpacity
          onPress={this.showOverlay}
          style={styles.inputContainerStyle}>
          {this.state.dateString != '' ? (
            <View style={styles.inputContainer}>
              <Text>{this.state.dateString}</Text>
            </View>
          ) : (
            <View style={styles.inputContainer}></View>
          )}
        </TouchableOpacity>
        {Platform.OS === 'ios' ? (
          <Overlay
            isVisible={this.state.show}
            onBackdropPress={this.hideOverlay}
            overlayStyle={styles.overlayStyle}>
            <View style={styles.headerStyle}>
              <TouchableOpacity onPress={this.hideOverlay}>
                <Text style={{paddingHorizontal: 15}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.hideOverlay}>
                <Text style={{paddingHorizontal: 15, color: 'green'}}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={this.state.date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
              style={{backgroundColor: 'white'}}
            />
          </Overlay>
        ) : (
          <>
            {this.state.show && (
              <DateTimePicker
                value={this.state.date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            )}
          </>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  headerStyle: {
    backgroundColor: 'blue',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#CDCDCD',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputContainerStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CAD3DF',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingRight: 10,
    height: 50,
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
    paddingTop: ScaleHelpers.CalcHeight(2),

    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  placeholderStyle: {
    fontFamily: 'Gill Sans',
    fontSize: 16,
    color: '#CDCDCD',
    marginHorizontal: 10,
  },
  textStyle: {
    fontFamily: 'Gill Sans',
    fontSize: 16,
    marginHorizontal: 10,
  },
});
export default DatePicker;
