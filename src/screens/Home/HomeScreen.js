/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text} from 'react-native';
import {LineChart, BarChart, XAxis, Grid} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import SegmentedControlTabs from 'react-native-segmented-control-tabs';

import {text} from '../../constants';
import {primaryColor} from '../../Theme/AppStyles';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {fontType} from '../../Theme/AppStyles';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';

import styles from './styles';
const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };
  render() {
    return (
      <>
        <NavigationHeader
          title={text.Indicateur}
          powerOff={true}
          subTitle={'Exercice'}
        />
        <View style={styles.container}>
          <SegmentedControlTabs
            values={[
              <Text
                style={{
                  color: this.state.selectedIndex == 0 ? 'white' : 'grey',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  fontFamily: fontType.bold,
                  fontSize: ScaleHelpers.CalcWidth(3),
                }}>
                {text.IndicateurCle}
              </Text>,
              <Text
                style={{
                  color: this.state.selectedIndex == 1 ? 'white' : 'grey',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  fontFamily: fontType.bold,
                  fontSize: ScaleHelpers.CalcWidth(3),
                }}>
                {text.Marge}
              </Text>,
              <Text
                style={{
                  color: this.state.selectedIndex == 2 ? 'white' : 'grey',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  fontFamily: fontType.bold,
                  fontSize: ScaleHelpers.CalcWidth(3),
                }}>
                {text.Excedent}
              </Text>,
              <Text
                style={{
                  color: this.state.selectedIndex == 3 ? 'white' : 'grey',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  fontFamily: fontType.bold,
                  fontSize: ScaleHelpers.CalcWidth(3),
                }}>
                {text.ChargePersonelle}
              </Text>,
            ]}
            handleOnChangeIndex={this.handleIndexChange}
            activeIndex={this.state.selectedIndex}
            tabsContainerStyle={{
              width: ScaleHelpers.CalcWidth(100),
              height: ScaleHelpers.CalcHeight(7),
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              marginTop: ScaleHelpers.CalcHeight(2),
            }}
            activeTabStyle={{
              backgroundColor: primaryColor,
              zIndex: 1,
            }}
            tabStyle={{
              borderRadius: ScaleHelpers.CalcWidth(1),
              borderColor: 'transparent',
              marginHorizontal: ScaleHelpers.CalcWidth(1),
            }}
          />
          <View style={styles.valueCardContainer}>
            <View style={styles.valueCardrowContainer}>
              <Text style={[styles.itemValue, {color: 'green'}]}>
                {'+9 000000 €'}
              </Text>
              <Text style={[styles.itemValue, {color: 'red'}]}>
                {'+9 000000 €'}
              </Text>
              <Text style={[styles.itemValue, {color: '#4EC7F5'}]}>
                {'+9 000000 €'}
              </Text>
            </View>
            <View style={styles.valueCardrowContainer}>
              <Text style={styles.itemLabel}>{text.SoldeCompte}</Text>
              <Text style={styles.itemLabel}>{text.ChiffreAffaire}</Text>
              <Text style={styles.itemLabel}>{text.Charge}</Text>
            </View>
          </View>
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
              data={[14, 80, 100, 55]}
              gridMin={0}
              svg={{fill: 'rgb(134, 65, 244)'}}
            />
            <XAxis
              style={{marginTop: 10}}
              data={[14, 80, 100, 55]}
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
