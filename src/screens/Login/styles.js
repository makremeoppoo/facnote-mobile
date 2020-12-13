/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import {textColor, buttonColor} from '../../AppStyles';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(90),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
  },

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScaleHelpers.CalcHeight(50),
    width: ScaleHelpers.CalcWidth(100),
  },
  error: {
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'red',
    marginTop: ScaleHelpers.CalcHeight(3),
    maxHeight: ScaleHelpers.CalcHeight(10),
    fontWeight: 'bold',
    fontSize: 15,
  },
  logo: {
    width: ScaleHelpers.CalcWidth(70),
    height: ScaleHelpers.CalcWidth(30),
  },
  formContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(40),
    paddingBottom: ScaleHelpers.CalcHeight(18),
  },

  title: {
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    lineHeight: 33,
  },

  label: {
    fontFamily: 'Nunito-Regular',
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginTop: ScaleHelpers.CalcHeight(1),

    marginLeft: ScaleHelpers.CalcWidth(20),
    color: 'white',
    fontSize: 15,
  },

  buttonContainer: {
    height: ScaleHelpers.CalcHeight(10),
    marginTop: ScaleHelpers.CalcHeight(1),

    alignSelf: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    paddingLeft: 10,
    height: ScaleHelpers.CalcHeight(7),
    width: ScaleHelpers.CalcWidth(60),
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
  },
  inputBlock: {
    height: ScaleHelpers.CalcHeight(12),
  },
  buttonStyle: {
    width: ScaleHelpers.CalcWidth(40),
    alignItems: 'center',
    padding: ScaleHelpers.CalcWidth(1),
    backgroundColor: buttonColor,
    borderRadius: 60,
    alignSelf: 'center',
    color: textColor,
    fontFamily: 'Nunito-Regular',
  },
  signTxt: {
    fontFamily: 'Nunito-Regular',
    fontSize: ScaleHelpers.CalcWidth(4),
    color: 'grey',
  },

  buttomText: {
    fontFamily: 'Nunito-SemiBold',
    color: textColor,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  checkboxContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(242, 242, 242,0)',
    borderColor: 'rgba(242, 242, 242,0)',
    marginLeft: ScaleHelpers.CalcWidth(20),
  },
  checkbox: {
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginTop: ScaleHelpers.CalcHeight(0.5),
    color: 'white',
  },
  checkboxLabel: {
    fontFamily: 'Nunito-Regular',
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginTop: ScaleHelpers.CalcHeight(1),
    color: 'white',
    fontSize: 15,
  },
  loader: {
  
    justifyContent:'center',
    position: 'absolute',
    height: ScaleHelpers.CalcHeight(80),
    width: ScaleHelpers.CalcWidth(100),
  },
});

export default styles;
