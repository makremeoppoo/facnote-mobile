/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor} from '../../AppStyles';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(110),
  },
  backgroundStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: '100%',
    position: 'absolute',
  },
  titleContainer: {
    height: ScaleHelpers.CalcHeight(20),
    textAlign: 'center',
    marginBottom: ScaleHelpers.CalcHeight(5),

    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    color: textColor,
    fontSize: ScaleHelpers.CalcHeight(5),
  },
  btnContainer: {
    flex: 1,
    overflow: 'hidden',
    borderColor: '#2c65c9',
    borderRadius: 20,
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Img: {
    width: ScaleHelpers.CalcWidth(80),
    height: ScaleHelpers.CalcHeight(15),
  },

  backgroundModalStyle: {
    width: ScaleHelpers.CalcWidth(105),
    height: '100%',
    position: 'absolute',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(100),
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalCloseView: {
    position: 'absolute',
    top: ScaleHelpers.CalcWidth(5),
    left: ScaleHelpers.CalcWidth(5),
  },
  closeImg: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),
  },
  buttomIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(20),
  },

  iconGestion: {
    margin: ScaleHelpers.CalcWidth(4),
    width: ScaleHelpers.CalcWidth(15),
    height: ScaleHelpers.CalcWidth(15),
  },
});

export default styles;
