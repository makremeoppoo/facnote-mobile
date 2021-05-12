/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View} from 'react-native';
import {LineChart, BarChart, XAxis, Grid} from 'react-native-svg-charts';
import * as scale from 'd3-scale'

import {text} from '../../constants';
import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';

import styles from './styles';
const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

class HomeScreen extends React.Component {
  render() {
    return (
      <>
        <NavigationHeader
          title={text.Indicateur}
          powerOff={true}
          subTitle={'Exercice'}
        />
        <View style={styles.container}>
          <View style={styles.chartContent}>
            <LineChart
              style={{flex: 1}}
              data={data}
              gridMin={0}
              contentInset={{top: 10, bottom: 10}}
              svg={{stroke: 'rgb(134, 65, 244)'}}>
              <Grid />
            </LineChart>
            <XAxis
              style={{marginHorizontal: -10}}
              data={data}
              formatLabel={(value, index) => index}
              contentInset={{left: 10, right: 10}}
              svg={{fontSize: 10, fill: 'black'}}
            />
          </View>
          <View style={styles.chartContent}>
            <BarChart
              style={{flex: 1}}
              data={ [ 14, 80, 100, 55 ]}
              gridMin={0}
              svg={{fill: 'rgb(134, 65, 244)'}}
            />
            <XAxis
              style={{marginTop: 10}}
              data={ [ 14, 80, 100, 55 ]}
              scale={scale.scaleBand}
              formatLabel={(value, index) => index}
              labelStyle={{color: 'black'}}
            />
          </View>
        </View>
      </>
    );
  }
}

export default HomeScreen;
