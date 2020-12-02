/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import ScaleHelpers from './components/scaleHelpers';

export const textColor = 'rgba(112,112,112,1)';
export const buttonColor = 'white';

export const landing = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //padding: 50
  },
  title: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  input: {
    color: 'black',
    fontSize: 17,
    marginLeft: 10,
    textAlign: 'center',
  },
  whiteBoldTxt: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  loginContainer: {
    width: SCREEN_WIDTH - 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ec1c27',
    borderColor: '#2c65c9',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});


export const activationModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContain: {
    width: ScaleHelpers.CalcWidth(70),
    height: ScaleHelpers.CalcHeight(40),
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,

    elevation: 5,
  },
  modalCloseView: {
    top: ScaleHelpers.CalcHeight(3),
    right: ScaleHelpers.CalcWidth(33),
  },
  closeImg: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),
  },
});
