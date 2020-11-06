/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor,buttonColor} from '../../AppStyles';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(110),

  },
  backgroundStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: "100%",
    position: 'absolute',
    
  },
  titleContainer: {
    height: ScaleHelpers.CalcHeight(20),
    textAlign: 'center',
    justifyContent:"center"

  },
  title: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    color: textColor,
    fontSize: ScaleHelpers.CalcHeight(5),
  },
  btnContainer: {
    flex: 1,
    overflow: 'hidden',
    borderColor: '#2c65c9',
    borderRadius: 20,
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Img: {
    width: ScaleHelpers.CalcWidth(80),
    height: ScaleHelpers.CalcHeight(15),
  },
});

export default styles;
