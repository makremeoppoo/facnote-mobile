/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor,buttonColor} from '../../AppStyles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(25),
    position: 'absolute',
  },
  topImageTransparentStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(27),
    position: 'absolute',
  },

  titleContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(27),
  },
  title: {
    fontFamily: 'SegoeUI',
    textAlign: 'center',
    color: textColor,
    fontSize: ScaleHelpers.CalcHeight(5),
  },
  cabinetImg: {
    fontFamily: 'Nunito-Bold',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: ScaleHelpers.CalcWidth(3),
    marginTop: ScaleHelpers.CalcWidth(3),
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
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',
    marginTop: ScaleHelpers.CalcHeight(3),
    marginBottom: ScaleHelpers.CalcHeight(1),

    width: ScaleHelpers.CalcWidth(70),
    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
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
