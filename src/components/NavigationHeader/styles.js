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
    marginTop: ScaleHelpers.CalcWidth(2),
    paddingTop: ScaleHelpers.CalcHeight(4),

    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    width: ScaleHelpers.CalcWidth(10),
    height: ScaleHelpers.CalcHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    width: ScaleHelpers.CalcWidth(3),
    height: ScaleHelpers.CalcHeight(3),
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ScaleHelpers.CalcHeight(4),
    width: ScaleHelpers.CalcWidth(90),
  },
  title: {
    fontFamily: 'SegoeUI',
    fontSize: ScaleHelpers.CalcWidth(5),

    color: 'white',
  },
});

export default styles;
