/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor, label} from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: ScaleHelpers.CalcHeight(5)
  },

  titleContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(5),
  },
  title: {
    fontFamily: 'SegoeUI',
    textAlign: 'center',
    color: textColor,
    fontSize: ScaleHelpers.CalcHeight(3),
  },

  infoContainer: {
    height: ScaleHelpers.CalcHeight(85),
    margin: ScaleHelpers.CalcWidth(3),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',
    margin: ScaleHelpers.CalcHeight(2),
    padding: ScaleHelpers.CalcHeight(2),
    width: ScaleHelpers.CalcWidth(90),
    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
  },
  input: {
    height: '100%',
    width: '100%',
  },
  ButtonsContain: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(15),
  },
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
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: textColor,
    textAlign: 'center',
  },
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
