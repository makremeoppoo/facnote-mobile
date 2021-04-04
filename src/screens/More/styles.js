/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor} from '../../Theme/AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topImageStyle: {
    width: ScaleHelpers.CalcWidth(150),
    height: ScaleHelpers.CalcHeight(20),
    marginLeft: ScaleHelpers.CalcWidth(-4),
    paddingRight: ScaleHelpers.CalcWidth(-4),
    position: 'absolute',
  },
  header: {
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(13),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    height: ScaleHelpers.CalcHeight(160),
  },
  headerBigText: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: 'Nunito-Regular',
    color: 'white',
  },
  headerText: {
    fontSize: ScaleHelpers.CalcWidth(2.5),
    fontFamily: 'Nunito-Regular',
    color: 'white',
  },

  cabinetCard: {
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    width: ScaleHelpers.CalcWidth(80),
    height: ScaleHelpers.CalcHeight(13),
    marginBottom: ScaleHelpers.CalcHeight(1),

    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cabinetText: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: 'Nunito-Bold',
    color: textColor,
    alignSelf: 'center',
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
    marginTop: ScaleHelpers.CalcHeight(1),
    marginBottom: ScaleHelpers.CalcHeight(1),

    width: ScaleHelpers.CalcWidth(90),
    height: ScaleHelpers.CalcHeight(10),

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
    width: ScaleHelpers.CalcWidth(70),
  },

  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(4),
    fontFamily: 'Nunito-Bold',
    color: textColor,
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(50),
  },
  itemTitle2: {
    fontSize: ScaleHelpers.CalcWidth(2.5),
    fontFamily: 'Nunito-Regular',
    color: textColor,
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(50),
  },
  rightArrow: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),

    alignSelf: 'center',
  },
  leftArrow: {
    width: ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),
    marginRight: ScaleHelpers.CalcWidth(5),

    alignSelf: 'center',
  },
  polygonImg: {
    width: ScaleHelpers.CalcWidth(25),
    height: ScaleHelpers.CalcWidth(25),
  },
});

export default styles;
