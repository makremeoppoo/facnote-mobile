/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor} from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(120),
    position: 'absolute',
  },
  topImageTransparentStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(27),
    position: 'absolute',
  },

  titleContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(25),
    width: ScaleHelpers.CalcWidth(100),
  },

  title: {
    fontFamily: 'SegoeUI',
    textAlign: 'center',
    color: textColor,
    fontSize: ScaleHelpers.CalcHeight(5),
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
    height:ScaleHelpers.CalcWidth(25),
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(45),

  },

  CabinerName: {
    fontFamily: 'Nunito-Bold',

    textAlign: 'center',
    fontSize: 15,
    color: textColor,
  },

  CabinerInfo: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
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
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: textColor,
    textAlign: 'center',
  },
});

export default styles;
