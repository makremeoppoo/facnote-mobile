/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import {landing} from '../../AppStyles';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {height: height },
  keyboardOffset: {
    height: height,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 2,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    lineHeight: 33,
    marginBottom: 20,
  },
  label: {
    marginLeft: SCREEN_WIDTH / 4,
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
  },
  logo: {
    width: 200,
    height: 200,
  },

  logContainer: {
    marginTop: 60,
    marginBottom: 80,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signupContainer: {
    width: SCREEN_WIDTH / 2,
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 60,
    alignSelf: 'center',
    color: 'rgba(112,112,112,1)',
  },
  signTxt: {
    fontSize: 20,
    color: 'grey',
  },
  inputBlock: {
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: 5,
    marginTop: 5,
    paddingLeft: 10,
    height: 40,
    width: SCREEN_WIDTH / 2 + 10,
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
  },

  topImageStyle: {
    width: SCREEN_WIDTH,
    height: (height * 7) / 8,
    position: 'absolute',
  },
});

export default styles;
