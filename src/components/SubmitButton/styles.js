/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
const styles = StyleSheet.create({
  btnSubmitContainer: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 3,
    overflow: 'hidden',
    borderColor: '#2c65c9',
    borderRadius: 13,
    alignSelf: 'center',
    justifyContent: 'center',
    width: ScaleHelpers.CalcWidth(40),
    height: ScaleHelpers.CalcHeight(5),
  },
  submitTxt: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  
  rectangle: {
    position: 'absolute',
    margin: 0,
    resizeMode: 'stretch',
    width: ScaleHelpers.CalcWidth(40),
    height: ScaleHelpers.CalcHeight(5),
  },
});

export default styles;
