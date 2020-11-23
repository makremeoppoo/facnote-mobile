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
  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(120),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
  },
  textContainer: {
    height: ScaleHelpers.CalcHeight(25),
    width: ScaleHelpers.CalcWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBold: {
    textAlign: 'left',
    fontFamily: 'Nunito-SemiBold',
    color: 'white',
    fontSize: ScaleHelpers.CalcHeight(3),
  },
  itemContainer: {
    flexDirection: 'row',
    padding: ScaleHelpers.CalcHeight(2),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',
    marginTop: ScaleHelpers.CalcHeight(1),
    marginBottom: ScaleHelpers.CalcHeight(1),

    width: ScaleHelpers.CalcWidth(90),
    height: ScaleHelpers.CalcHeight(15),

    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  itemContainerBleu: {
    flexDirection: 'row',
    padding: ScaleHelpers.CalcHeight(2),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',
    marginTop: ScaleHelpers.CalcHeight(1),
    marginBottom: ScaleHelpers.CalcHeight(1),

    width: ScaleHelpers.CalcWidth(90),
    height: ScaleHelpers.CalcHeight(15),
    borderRadius: 10,
    backgroundColor: 'rgb( 189 ,232 ,250)',
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  rowContainer: {

    flexDirection: 'column',
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(70),
  },

  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: 'SegoeUI',
    color: textColor,
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(70),
  },
  itemTitle2: {
    fontSize: ScaleHelpers.CalcWidth(2.5),
    fontFamily: 'SegoeUI',
    color: textColor,
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(70),
  },
  itemTitleBold: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: 'SegoeUI-Semibold',
    color: textColor,
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(70),
  },
  rightArrow: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),

  },
});

export default styles;
