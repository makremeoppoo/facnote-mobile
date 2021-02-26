/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../scaleHelpers';

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 0,
    justifyContent: 'center',
    margin: 0,
  },
  headerButtonImage: {
    resizeMode: 'stretch',
    width: ScaleHelpers.CalcWidth(100),
    height: ScaleHelpers.CalcHeight(12),
    position: 'absolute',
    margin: 0,
  },
  headerContain: {
    justifyContent: 'center',
    marginBottom: ScaleHelpers.CalcHeight(2),
    marginTop: ScaleHelpers.CalcWidth(4),

    alignItems: 'center',
    flexDirection: 'row',
  },

  btnIcon: {
    width: ScaleHelpers.CalcWidth(3),
    height: ScaleHelpers.CalcHeight(3),
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(4),
    marginTop: ScaleHelpers.CalcWidth(5),
    width: ScaleHelpers.CalcWidth(80),
  },
  title: {
    fontFamily: 'Nunito-Regular',
    fontSize: ScaleHelpers.CalcWidth(5),
    color: 'white',
  },
  subTitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: ScaleHelpers.CalcWidth(3.8),
    color: 'white',
  },
});

export default styles;
