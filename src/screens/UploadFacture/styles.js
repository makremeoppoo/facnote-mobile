/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  backgroundStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: "100%",
    position: 'absolute',
  },
  titleContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(27),
  },
  title: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    color: 'rgb(112,112,112)',
    fontSize: ScaleHelpers.CalcHeight(5),
  },
  btnContainer: {
    flex: 1,
    overflow: 'hidden',
    borderColor: '#2c65c9',
    borderRadius: 20,
    position: 'relative',
    marginTop: ScaleHelpers.CalcHeight(3),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Img: {
    width: ScaleHelpers.CalcWidth(80),
    height: ScaleHelpers.CalcHeight(15),
  },
});

export default styles;
