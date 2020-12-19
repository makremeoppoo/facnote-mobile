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
    alignItems:"center"
  },
  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(100)-70,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'stretch',
    position:"absolute"
  },
  textContainer: {
    height: ScaleHelpers.CalcHeight(100),
    paddingTop:ScaleHelpers.CalcHeight(10),
    width: ScaleHelpers.CalcWidth(90),
    justifyContent: 'center',
  },
  textBold: {
    textAlign: "left",
    fontFamily: 'Nunito-Bold',
    color: textColor,
    fontSize: ScaleHelpers.CalcWidth(5),
  },
  text: {
    textAlign: "left",
    fontFamily: 'Nunito-SemiBold',
    color: textColor,
    fontSize: ScaleHelpers.CalcHeight(2),
  },
});

export default styles;