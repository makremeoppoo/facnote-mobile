/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';
import ScaleHelpers from '../../components/scaleHelpers';
import {textColor,buttonColor} from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topImageStyle: {
    width: ScaleHelpers.CalcWidth(150),
    height: ScaleHelpers.CalcHeight(25),
    marginLeft: ScaleHelpers.CalcWidth(-4),
    paddingRight: ScaleHelpers.CalcWidth(-4),

  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
 
     width: ScaleHelpers.CalcWidth(70),
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
    flexDirection: 'row',
    alignSelf: 'center',
  },

  itemTitle: {
    fontSize: 17,
    fontFamily:"Nunito-Regular",
    color: textColor,
    alignSelf: 'center',
    width : ScaleHelpers.CalcWidth(50),

  },
  rightArrow: {
    width : ScaleHelpers.CalcWidth(5),
    height: ScaleHelpers.CalcWidth(5),

    alignSelf: 'center'
  }
});

export default styles;