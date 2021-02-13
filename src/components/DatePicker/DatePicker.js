import React, {useState, useEffect} from 'react';
import {View, Platform, TouchableOpacity, Text, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import moment from 'moment';
import ScaleHelpers from '../scaleHelpers';
import {textColor} from '../../AppStyles';

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

export default DatePicker = ({
  setCurrentDate,
  label,
  errorLabel,
  display = 'row',
  initialDate = null,
}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (initialDate != null) setDate(initialDate);
  }, [initialDate]); // Only re-run the effect if count changes

  const handleConfirm = (date) => {
    setShow(false);
    setDate(date);
    setCurrentDate(moment(date).format('YYYY-MM-DD'));
  };

  const showTimepicker = () => {
    setShow(!show);
  };

  return (
    <View style={styles.inputBlock}>
      <TouchableOpacity onPress={showTimepicker}>
        <Text
          style={{...styles.label, ...{color: errorLabel ? 'red' : textColor}}}>
          {label}
        </Text>
        <View
          style={[
            styles.inputContainer,
            display == 'column'
              ? {
                  width: ScaleHelpers.CalcWidth(40),
                  margin: ScaleHelpers.CalcWidth(1),
                }
              : {
                  width: ScaleHelpers.CalcWidth(80),
                  margin: ScaleHelpers.CalcWidth(1),
                },
          ]}>
          <Text>
            {initialDate == null ? '' : moment(date).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.error}>{errorLabel}</Text>
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePickerModal
          isVisible={show}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={showTimepicker}
          display={Platform.OS == 'ios' ? 'spinner' : 'default'}
          locale="fr_FR"
          headerTextIOS={''}
          cancelTextIOS={'Fermer'}
          confirmTextIOS={'Confirmer'}
        />
      )}
    </View>
  );
};
