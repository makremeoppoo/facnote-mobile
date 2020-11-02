/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:ScaleHelpers.CalcHeight(25)
  },
  infoContainer: {
    marginBottom: 40,
    //marginTop: 80
    marginTop: 30
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20
  },
  userName: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  },
 
  btnContainer: {
    
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,

    // its for android 
    elevation: 5,
    position:'relative',
    marginTop: 20,
    marginBottom: 20,
    width: SCREEN_WIDTH - 40,
    borderRadius: 10,
    backgroundColor: 'rgb( 255,255,255)',
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10
  },
  btnTxt: {
    fontSize: 16,
    color: '#070f12',
    fontWeight: '400',
    textAlign: 'center'
  }
});

export default styles;
