/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(92),
    position: 'absolute',
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScaleHelpers.CalcHeight(50),
  },
  formContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(40),
  },

  title: {
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    lineHeight: 33,
  },
  inputBlock: {
    height: ScaleHelpers.CalcHeight(10),
  },
  logo: {
    width: 200,
    height: 200,
  },

  label: {
    fontFamily: 'Nunito-Regular',
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginLeft: ScaleHelpers.CalcWidth(28),
    color: 'white',
    fontSize: 12,
  },

  buttonContainer: {
    height: ScaleHelpers.CalcHeight(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    paddingLeft: 10,
    height: ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(50),
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
  },
  buttonStyle: {
    width: ScaleHelpers.CalcWidth(50),
    alignItems: 'center',
    padding: ScaleHelpers.CalcWidth(1),
    backgroundColor: 'white',
    borderRadius: 60,
    alignSelf: 'center',
    color: 'rgba(112,112,112,1)',
    fontFamily: 'Nunito-Regular',
  },
  signTxt: {
    fontFamily: 'Nunito-Regular',
    fontSize: ScaleHelpers.CalcWidth(4),
    color: 'grey',
  },

  buttomText: {
    fontFamily: 'Nunito-SemiBold',
    color: 'rgba(112,112,112,1)',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    fontSize: 12,

    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
