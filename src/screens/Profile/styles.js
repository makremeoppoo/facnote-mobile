/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(25),
    position: 'absolute',
  },
  topImageTransparentStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(27),
    position: 'absolute',
  },

  titleContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(27),
  },
  title: {
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'rgb(112,112,112)',
    fontSize: ScaleHelpers.CalcHeight(4),
  },
  cabinetImg: {
    fontFamily: 'Nunito-Bold',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: ScaleHelpers.CalcWidth(3),
    marginTop: ScaleHelpers.CalcWidth(3),
  },
  CabinerName: {
    textAlign: 'center',
    fontSize: 15,
    color: 'rgb(112 ,112, 112)',
  },

  CabinerInfo: {
    fontFamily: 'Nunito-Light',

    fontSize: 15,
    color: 'rgb(112 ,112, 112)',
    textAlign: 'center',
  },

  btnContainer: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',
    marginTop: ScaleHelpers.CalcHeight(4),
    width: ScaleHelpers.CalcWidth(70),
    borderRadius: 10,
    backgroundColor: 'rgb( 255,255,255)',
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  btnTxt: {
    fontFamily: 'Nunito-Light',
    fontSize: 15,
    color: '#070f12',
    textAlign: 'center',
  },
});

export default styles;
