/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor, buttonColor} from '../../Theme/AppStyles';
import {fontType} from '../../Theme/AppStyles';

const styles = StyleSheet.create({
  btnContainer: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 3,
    position: 'relative',
    width: ScaleHelpers.CalcWidth(40),
    height: ScaleHelpers.CalcHeight(5),
    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: ScaleHelpers.CalcWidth(1),
    margin: ScaleHelpers.CalcWidth(1),
  },
  btnTxt: {
    fontFamily: fontType.base,
    fontSize: 15,
    color: textColor,
    textAlign: 'center',
  },
});

export default styles;
