/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor} from '../../AppStyles';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(100),
    alignItems: 'center',
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScaleHelpers.CalcHeight(20),
    width: ScaleHelpers.CalcWidth(100),
  },
  logo: {
    width: ScaleHelpers.CalcWidth(54),
    height: ScaleHelpers.CalcWidth(23),
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Nunito-ExtraBold',
    fontSize: ScaleHelpers.CalcHeight(4),
  },

  buttonView: {
    height: ScaleHelpers.CalcHeight(15),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: ScaleHelpers.CalcWidth(30),
    alignItems: 'center',
    padding: 5,
    backgroundColor: buttonColor,
    borderRadius: 60,
    alignSelf: 'center',
  },
  buttonTxt: {
    fontFamily: 'Nunito-Regular',
    fontSize: ScaleHelpers.CalcHeight(2),
    color: textColor,
  },

  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(100),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  buttomView: {
    bottom: 0,

    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttomText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: ScaleHelpers.CalcWidth(4),
  },
});

export default styles;
