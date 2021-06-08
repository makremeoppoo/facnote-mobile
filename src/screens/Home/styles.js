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
    backgroundColor: 'white',
  },

  chartContent: {
    height: ScaleHelpers.CalcHeight(25),
    width: ScaleHelpers.CalcWidth(90),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  valueCardrowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  valueCardContainer: {
    flexDirection: 'column',
    padding: ScaleHelpers.CalcHeight(1),
    marginTop: ScaleHelpers.CalcHeight(1),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    width: ScaleHelpers.CalcWidth(90),
    height: ScaleHelpers.CalcHeight(8),
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  tabStyle: {
    backgroundColor: 'rgba(214, 214, 214, 0.4)',
    marginHorizontal: ScaleHelpers.CalcWidth(2),
    borderRadius: ScaleHelpers.CalcWidth(2),
    borderWidth: ScaleHelpers.CalcWidth(1),
    borderColor: 'rgba(214, 214, 214, 0.4)',
    height: ScaleHelpers.CalcHeight(6),
  },
  shadeImage: {
    borderRadius: ScaleHelpers.CalcWidth(2),
    position: 'absolute',
    borderWidth: ScaleHelpers.CalcWidth(2),
    width: ScaleHelpers.CalcWidth(25),
    height: ScaleHelpers.CalcHeight(6),
  },
  itemLabel: {
    fontSize: ScaleHelpers.CalcWidth(4),
    width: ScaleHelpers.CalcWidth(30),
    textAlign: 'center',
    color: '#707070',
    fontFamily: fontType.base,
  },
  itemValue: {
    fontSize: ScaleHelpers.CalcWidth(4),
    width: ScaleHelpers.CalcWidth(30),
    textAlign: 'center',
    color: '#707070',
    fontFamily: fontType.bold,
  },
  titleChartContainer: {
    marginTop: ScaleHelpers.CalcHeight(2),
    width:ScaleHelpers.CalcWidth(30),
  },
  titleChart: {
    fontSize: ScaleHelpers.CalcWidth(4),
    width: ScaleHelpers.CalcWidth(30),
   
    textAlign: 'center',
    color: '#707070',
    fontFamily: fontType.bold,
  },
});

export default styles;
