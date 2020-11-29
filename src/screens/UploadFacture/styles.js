/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor} from '../../AppStyles';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundStyle: {
    width: ScaleHelpers.CalcWidth(100),
    marginTop: ScaleHelpers.CalcHeight(10),
    height: '100%',
    position: 'absolute',
  },
  titleContainer: {
    height: ScaleHelpers.CalcHeight(25),
    paddingTop: ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(100),
  },
  buttonContainer: {
    height: ScaleHelpers.CalcHeight(65),
  },
  title: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
    color: textColor,
    fontSize: ScaleHelpers.CalcHeight(5),
  },
  btnView: {
    height: ScaleHelpers.CalcHeight(15),
    marginTop: ScaleHelpers.CalcHeight(3),
  },

  btnContainer: {
    padding: 0,
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
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: ScaleHelpers.CalcHeight(20),
    justifyContent: 'flex-start',
    width: ScaleHelpers.CalcWidth(80),
    height: ScaleHelpers.CalcHeight(100),
    flexWrap: 'wrap',
  },
  viewImg: {
    width: ScaleHelpers.CalcWidth(25),
    height: ScaleHelpers.CalcWidth(25),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  ImgPlus: {
    margin: ScaleHelpers.CalcWidth(3),
    borderRadius: ScaleHelpers.CalcWidth(3),
    width: ScaleHelpers.CalcWidth(20),
    height: ScaleHelpers.CalcWidth(20),
    backgroundColor: 'white',
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
  textStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(15),
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
  },
  SendIconView: {
    margin: ScaleHelpers.CalcWidth(4),
    paddingLeft: ScaleHelpers.CalcWidth(4),
    paddingTop: ScaleHelpers.CalcWidth(2),

    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  SendIcon: {
    width: ScaleHelpers.CalcWidth(13),
    height: ScaleHelpers.CalcWidth(13),
  },
  error: {
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'red',
    marginTop: ScaleHelpers.CalcHeight(13),
    maxHeight: ScaleHelpers.CalcHeight(10),
    fontWeight: 'bold',
    fontSize: 15,
    position: 'absolute',
  },
  success: {
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'green',
    marginTop: ScaleHelpers.CalcHeight(13),
    maxHeight: ScaleHelpers.CalcHeight(10),
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 15,
  },
});

export default styles;
