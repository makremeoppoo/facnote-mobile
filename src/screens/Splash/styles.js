/* eslint-disable comma-dangle */
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
padding:0,
margin:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: ScaleHelpers.CalcWidth(70),
    height: ScaleHelpers.CalcWidth(30),
    margin: 50,
  },
  backgroundStyle: {
    width: "120%",
    height: '100%',
    position: 'absolute',
  },
});

export default styles;
