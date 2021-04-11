/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor, buttonColor} from '../../Theme/AppStyles';
import {fontType} from '../../Theme/AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(100),
    resizeMode: 'stretch',
    position: 'absolute',
  },

  titleContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(20),
    marginBottom: ScaleHelpers.CalcHeight(5),

    width: ScaleHelpers.CalcWidth(100),
  },

  title: {
    fontFamily: 'SegoeUI',
    textAlign: 'center',
    color: textColor,
    fontSize: ScaleHelpers.CalcWidth(6),
  },
  buttonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(75),
  },

  cabinetImgContainer: {
    marginBottom: ScaleHelpers.CalcWidth(7),
    marginTop: ScaleHelpers.CalcWidth(7),

    alignItems: 'center',
  },

  cabinetImg: {
    height: ScaleHelpers.CalcWidth(25),
    width: ScaleHelpers.CalcWidth(45),
  },

  CabinerName: {
    fontFamily: fontType.bold,

    textAlign: 'center',
    fontSize: ScaleHelpers.CalcWidth(4),
    color: textColor,
  },

  CabinerInfo: {
    fontFamily: fontType.base,
    fontSize: ScaleHelpers.CalcWidth(4),
    color: textColor,
    textAlign: 'center',
  },

  btnContainer: {
    height: ScaleHelpers.CalcHeight(30),
  },
  btn: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',
    marginTop: ScaleHelpers.CalcHeight(2),
    marginBottom: ScaleHelpers.CalcHeight(2),
    width: ScaleHelpers.CalcWidth(70),
    borderRadius: 10,
    backgroundColor: buttonColor,
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  btnTxt: {
    fontFamily: fontType.base,
    fontSize: ScaleHelpers.CalcWidth(4),
    color: textColor,
    textAlign: 'center',
  },
});

export default styles;
