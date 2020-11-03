/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(20),
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Nunito-ExtraBold',
    fontSize: ScaleHelpers.CalcHeight(4),
  },

  logContainer: {
    height: ScaleHelpers.CalcHeight(20),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signupContainer: {
    width: ScaleHelpers.CalcWidth(45),
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 60,
    alignSelf: 'center',
    color: 'rgba(112,112,112,1)',
  },
  signTxt: {
    fontFamily: 'Nunito-Regular',
    fontSize: ScaleHelpers.CalcHeight(2),
    color: 'grey',
  },
  image: {
    width: ScaleHelpers.CalcWidth(60),
    height: ScaleHelpers.CalcHeight(60),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'stretch',
  },

  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(50),
    position: 'absolute',
  },
  buttomText: {
    fontFamily: 'Nunito-Bold',
    color: 'rgba(112,112,112,1)',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    fontSize: ScaleHelpers.CalcWidth(4),

    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
