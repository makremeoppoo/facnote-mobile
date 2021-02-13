/* eslint-disable comma-dangle */
import {StyleSheet, Dimensions} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor} from '../../AppStyles';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(100),
    paddingTop: ScaleHelpers.CalcWidth(5),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flatListStyle: {
    maxHeight: '80%',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: ScaleHelpers.CalcHeight(1),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',
    marginTop: ScaleHelpers.CalcHeight(2),
    marginBottom: ScaleHelpers.CalcHeight(2),

    width: ScaleHelpers.CalcWidth(30),
    height: ScaleHelpers.CalcHeight(5),

    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: 'SegoeUI-Light',
    color: textColor,
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
    top:
      Platform.OS === 'ios'
        ? ScaleHelpers.CalcWidth(14)
        : ScaleHelpers.CalcWidth(12),
    left: ScaleHelpers.CalcWidth(5),
  },
  closeImg: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),
  },
  pdfContainer: {
    flex: 1,
    marginTop: ScaleHelpers.CalcHeight(15),
    marginBottom: ScaleHelpers.CalcHeight(10),
  },
  pdf: {
    width: ScaleHelpers.CalcWidth(90),
    height: ScaleHelpers.CalcHeight(70),
  },
  backgroundModalStyle: {
    width: ScaleHelpers.CalcWidth(105),
    height: '100%',
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: ScaleHelpers.CalcHeight(10),
  },
  modalContant: {
    height: ScaleHelpers.CalcHeight(85),
    margin: ScaleHelpers.CalcWidth(3),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    margin: ScaleHelpers.CalcHeight(2),
    padding: ScaleHelpers.CalcHeight(2),
    width: ScaleHelpers.CalcWidth(90),
    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    flex: 1,
  },
  input: {
    height: '100%',
    width: '40%',
  },
  ButtonsContain: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(15),
  },
  btnContainer: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 3,
    position: 'relative',
    width: ScaleHelpers.CalcWidth(40),
    height: ScaleHelpers.CalcHeight(5),
    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: ScaleHelpers.CalcWidth(1),
    margin: ScaleHelpers.CalcWidth(1),
  },
  btnTxt: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: textColor,
    textAlign: 'center',
  },
  btnSubmitContainer: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 3,
    overflow: 'hidden',
    borderColor: '#2c65c9',
    borderRadius: 13,
    alignSelf: 'center',
    justifyContent: 'center',
    width: ScaleHelpers.CalcWidth(40),
    height: ScaleHelpers.CalcHeight(5),
  },
  submitTxt: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
