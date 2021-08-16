/* eslint-disable comma-dangle */
import {StyleSheet, Platform} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {textColor} from '../../Theme/AppStyles';
import {fontType} from '../../Theme/AppStyles';


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: ScaleHelpers.CalcHeight(100),
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  topImageStyle: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(100),
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
    fontSize: ScaleHelpers.CalcWidth(4),
  },
  logo: {
    resizeMode: 'stretch',
    width: ScaleHelpers.CalcWidth(70),
    height: ScaleHelpers.CalcWidth(30),
  },
  formContainer: {
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(40),
    paddingBottom: ScaleHelpers.CalcHeight(18),
    flex:1
  },

  title: {
    fontFamily: 'Nunito-ExtraBold',
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    lineHeight: 33,
  },

  label: {
    fontFamily: fontType.base,
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginTop: ScaleHelpers.CalcHeight(1),
    marginLeft: ScaleHelpers.CalcWidth(20),
    color: 'white',
    fontSize: ScaleHelpers.CalcWidth(4),
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
    alignItems:"center",
    alignContent:"center",
  },
  inputBlock: {
    height: ScaleHelpers.CalcHeight(12),
  },
  input: {
    height: "100%",
    width: "100%",
  },
  buttonStyle: {
    width: ScaleHelpers.CalcWidth(40),
    alignItems: 'center',
    padding: ScaleHelpers.CalcWidth(1),
    backgroundColor:'white',
    borderRadius: 60,
    alignSelf: 'center',
    color: textColor,
    fontFamily: fontType.base,
  },
  signTxt: {
    fontFamily: fontType.base,
    fontSize: ScaleHelpers.CalcWidth(4),
    color: 'grey',
  },

  buttomView: {
    bottom: Platform.OS !== 'ios' ? 0 : 15,

    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttomText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: ScaleHelpers.CalcWidth(4),
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
    fontFamily: fontType.base,
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginTop: ScaleHelpers.CalcHeight(1),
    color: 'white',
    fontSize: ScaleHelpers.CalcWidth(4),
  },
  loader: {
    justifyContent: 'center',
    position: 'absolute',
    height: ScaleHelpers.CalcHeight(80),
    width: ScaleHelpers.CalcWidth(100),
  },
  listViewContainer: {
    minHeight: ScaleHelpers.CalcHeight(30),
    position: "absolute", 
    zIndex:999,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top:ScaleHelpers.CalcHeight(-2),
  },
  item: {
    textAlign:'center',
    zIndex:1,
    minWidth:ScaleHelpers.CalcWidth(50),
    height: ScaleHelpers.CalcHeight(8),

  },
  versionNotif: {padding: ScaleHelpers.CalcWidth(2), position: 'absolute', top: ScaleHelpers.CalcHeight(8), height: ScaleHelpers.CalcHeight(5), alignContent: 'center', backgroundColor: 'rgba(0, 255, 66, 0.5)', width: 'auto', alignSelf: 'center' }

});

export default styles;
