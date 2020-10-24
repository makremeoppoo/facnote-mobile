/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';
import { chart } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9'
  },
  chartContainer: {
    ...chart.chartContainer,
    //marginTop: 80,
    marginTop: 15,
    marginBottom: 20
  },
  facilitieContainer: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'
  }
});

export default styles;
