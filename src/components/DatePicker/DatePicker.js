import React, {useState} from 'react';
import {View, Platform, TouchableOpacity, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ScaleHelpers from '../scaleHelpers';

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
});

export default DatePicker = ({setCurrentDate}) => {
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
    <View>
      <TouchableOpacity onPress={showTimepicker}>
        <View style={styles.inputContainer}>
          <Text>{moment(date).format('DD/MM/YYYY')}</Text>
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
