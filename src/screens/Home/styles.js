/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor} from '../../Theme/AppStyles';
import {fontType} from '../../Theme/AppStyles';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(100),
    alignItems:"center"
  },

  chartContent: {
    height: ScaleHelpers.CalcHeight(25),
    marginTop:ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(90),
    justifyContent: 'center',
  },
 
});

export default styles;