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
    height: ScaleHelpers.CalcHeight(16),
    position: 'absolute',
    margin: 0,
  },

  headerContain: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleContainer: {
    paddingTop: ScaleHelpers.CalcHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(16),
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
