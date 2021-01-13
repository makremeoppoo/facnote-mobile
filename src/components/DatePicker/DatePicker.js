import React, {useState} from 'react';
import {View, Platform, TouchableOpacity, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ScaleHelpers from '../scaleHelpers';
import {textColor, buttonColor, label} from '../../AppStyles';

const styles = StyleSheet.create({
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
  error: {
    position: 'relative',
    marginTop: ScaleHelpers.CalcHeight(3),
    marginBottom: ScaleHelpers.CalcHeight(1),
    color: 'red',
    fontSize: 12,
  },

  inputBlock: {
    height: ScaleHelpers.CalcHeight(13),
  },
  label: {
    fontFamily: 'Nunito-Regular',
    margin: ScaleHelpers.CalcWidth(2),
    fontSize: 12,
  },
});

export default DatePicker = ({setCurrentDate, label, errorLabel}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setCurrentDate(moment(selectedDate).format('YYYY-MM-DD'));
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.inputBlock}>
      <TouchableOpacity onPress={showTimepicker}>
      <Text style={{...styles.label, ...{color: errorLabel ? 'red' : textColor}}}>
        {label}
      </Text>
        <View style={styles.inputContainer}>
       
          <Text>{moment(date).format('DD/MM/YYYY')}</Text>
          <Text style={styles.error}>{errorLabel}</Text>
        </View>
      </TouchableOpacity>
     

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
          
        />
      )}
    </View>
  );
};
