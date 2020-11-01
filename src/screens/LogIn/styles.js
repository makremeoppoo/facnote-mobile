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
    height: ScaleHelpers.CalcHeight(35),
  },
  formContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(60),
  },

  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    lineHeight: 33,
  },
  label: {
    marginLeft: ScaleHelpers.CalcWidth(25),
    color: 'white',
    fontSize: 12,
  },
 
  buttonContainer: {
    height: ScaleHelpers.CalcHeight(10),
    alignSelf: 'center',
    justifyContent: 'center',
  },

  buttonStyle: {
    width: ScaleHelpers.CalcWidth(50),
    alignItems: 'center',
    padding: ScaleHelpers.CalcWidth(1),
    backgroundColor: 'white',
    borderRadius: 60,
    alignSelf: 'center',
    color: 'rgba(112,112,112,1)',
  },
  signTxt: {
    fontSize: 20,
    color: 'grey',
  },

  inputContainer: {
    paddingLeft: 10,
    height: ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(50),
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
  },

  buttomText: {
    color: 'rgba(112,112,112,1)',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
