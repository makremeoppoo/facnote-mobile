/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor, buttonColor} from '../../AppStyles';

const styles = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(80),
    borderBottomColor: 'rgba(214, 214, 214, 0.6)',
    borderBottomWidth: 1,
    padding: ScaleHelpers.CalcWidth(3),
  },

  itemTitleContainer: {
    flexDirection: 'row',
    padding: ScaleHelpers.CalcHeight(1),
    //Its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // its for android
    elevation: 5,
    position: 'relative',

    width: ScaleHelpers.CalcWidth(90),
    height: ScaleHelpers.CalcHeight(5),

    borderRadius: 10,
    backgroundColor: buttonColor,
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  itemIcon: {
    alignSelf: 'center',
    width: ScaleHelpers.CalcWidth(7),
    height: ScaleHelpers.CalcWidth(7),
    marginRight:  ScaleHelpers.CalcWidth(1),
    marginLeft:  ScaleHelpers.CalcWidth(1),
    //lineHeight: 30
  },
  itemTxtContainer: {
    alignSelf: 'center',
    margin: ScaleHelpers.CalcWidth(1),
    lineHeight: 34,
  },
  blueTitle: {
    fontSize: ScaleHelpers.CalcWidth(3),
    color: 'rgb( 92,117,254)',
    fontFamily: 'Nunito-Bold',
    margin: ScaleHelpers.CalcWidth(2),
  },
  itemTitle: {
    fontSize: ScaleHelpers.CalcWidth(3),
    color: 'rgb(112,112,112)',
    fontFamily: 'Nunito-Bold',
  },
  row: {flex: 1, flexDirection: 'row'},

  itemText: {
    fontSize: ScaleHelpers.CalcWidth(3),
    fontFamily: 'Nunito-Bold',
    color: '#7f7d80',
    minWidth: ScaleHelpers.CalcWidth(20),
    maxWidth: ScaleHelpers.CalcWidth(20),
  },
  blueItemText: {
    fontSize: ScaleHelpers.CalcWidth(3),
    color: 'rgb( 92,117,254)',
    fontFamily: 'Nunito-Bold',
    minWidth: ScaleHelpers.CalcWidth(13),
    maxWidth: ScaleHelpers.CalcWidth(13),
  },
  amountContainer: {
    height: ScaleHelpers.CalcHeight(5),
    width: ScaleHelpers.CalcWidth(20),
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  amountItem: {
    textAlign: 'center',
    color: 'rgb(112,112,112)',
    fontSize: ScaleHelpers.CalcWidth(3),
    fontFamily: 'Nunito-Bold',
  },
});

export default styles;
