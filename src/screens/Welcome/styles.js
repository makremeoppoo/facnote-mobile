/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import {landing} from '../../AppStyles';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    justifyContent: 'center',
    height: height / 4-20,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
  description: {
    textAlign: 'center',
    color: '#070f12',
    fontSize: 16,
    fontWeight: 'bold',
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
    color:"rgba(112,112,112,1)"

  },
  signTxt: {
    fontSize: 20,
    color: 'grey',
  },
  image: {
    width: SCREEN_WIDTH,
    height:  height / 2-10,
    alignSelf: 'center',
  },
  topImageStyle: {
    width: SCREEN_WIDTH,
    height: height / 2,
    position: 'absolute',
  },
});

export default styles;
