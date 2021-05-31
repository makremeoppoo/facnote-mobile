/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text} from 'react-native';
import {LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';

import SegmentedControlTabs from 'react-native-segmented-control-tabs';
import moment from 'moment';
import getIndicator from '../../services/getIndicator';

import {text} from '../../constants';
import {primaryColor} from '../../Theme/AppStyles';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {fontType} from '../../Theme/AppStyles';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import getExercices from '../../services/getExercices';
import CustomGrid from '../../components/CustomGrid/CostumGrid';

import styles from './styles';
const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
const xAxisData = [
  'label',
  '10',
  '40',
  '95',
  '4',
  '24',
  '85',
  '91',
  '35',
  '53',
  '53',
  '24',
  '50',
  '20',
  '80',
];

const axesSvg = {fontSize: 10, fill: 'grey'};
const verticalContentInset = {top: 10, bottom: 10};
const xAxisHeight = 30;

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,

      exercises: [],
      exercise: {},
      turnover: {},
      fixedCharge: {},
      notFixedCharge: {},
      bankBalance: {},
    };
  }
  async componentDidMount() {
    var exercisesData = await getExercices();
    let exercises = [];

    exercisesData.exercises.map((item, index) => {
      exercises.push({
        key: index++,
        label: `${moment(item.date_debut).format('DD/MM/YYYY')} au ${moment(
          item.date_fin,
        ).format('DD/MM/YYYY')}`,
        date_debut: item.date_debut,
        date_fin: item.date_fin,
      });
    });

    const exercise = exercises.find(
      (item) =>
        item.date_debut == exercisesData.current_exercise.date_debut &&
        item.date_fin == exercisesData.current_exercise.date_fin,
    );
    const indicators = await getIndicator(
      moment(exercise.date_debut).format('YYYY'),
    );
    const turnover = indicators.data_table_2.find(
      (item) => item.label == "Chiffre d'affaire",
    );
    const fixedCharge = indicators.data_table_2.find(
      (item) => item.label == 'Charge fixe',
    );
    const notFixedCharge = indicators.data_table_2.find(
      (item) => item.label == 'Charge variable',
    );

    const bankBalance = indicators.data_table_1.find(
      (item) => item.label == 'Solde de la banque',
    );
    this.setState({
      exercises,
      exercise,
      turnover,
      fixedCharge,
      notFixedCharge,
      bankBalance,
    });
  }
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };
  render() {
    const {
      exercise,
      exercises,
      turnover,
      fixedCharge,
      notFixedCharge,
      bankBalance,
    } = this.state;


    return (
      <>
        <NavigationHeader
          title={text.Indicateur}
          powerOff={true}
          showSelectExecices
          exercises={exercises}
          exercise={exercise}
          setExercise={(option) =>
            this.setState({
              exercise: option,
            })
          }
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
              <Text style={[styles.itemValue, {color: '#4EC7F5'}]}>
                {bankBalance.total?.toFixed(2)} {' €'}
              </Text>
              <Text style={[styles.itemValue, {color: '#EA4C89'}]}>
                {turnover.total?.toFixed(2)} {' €'}
                {' €'}
              </Text>
              <Text style={[styles.itemValue, {color: '#4CC418'}]}>
                {(fixedCharge.total + notFixedCharge.total)?.toFixed(2)}
              </Text>
            </View>
            <View style={styles.valueCardrowContainer}>
              <Text style={styles.itemLabel}>{text.SoldeCompte}</Text>
              <Text style={styles.itemLabel}>{text.ChiffreAffaire}</Text>
              <Text style={styles.itemLabel}>{text.Charge}</Text>
            </View>
          </View>
          <View style={styles.titleChartContainer}>
            <Text style={styles.titleChart}>Charge</Text>
          </View>
          <View style={styles.chartContent}>
            <YAxis
              data={data}
              style={{marginBottom: 0}}
              contentInset={verticalContentInset}
              svg={axesSvg}
              max={95}
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <LineChart
                style={{flex: 1}}
                data={data}
                svg={{
                  stroke: '#4CC418',
                  strokeWidth: 2,
                }}
                contentInset={{top: 20, bottom: 20}}
                curve={shape.curveLinear}>
                <CustomGrid />
              </LineChart>
              <XAxis
                data={xAxisData}
                svg={{
                  fill: 'grey',
                  fontSize: 8,
                  fontWeight: 'bold',
                  rotation: 20,
                  originY: 30,
                  y: 5,
                }}
                formatLabel={(index) => xAxisData[index]}
                style={{marginHorizontal: -15, height: 20}}
                contentInset={{left: 10, right: 25}}
              />
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default HomeScreen;
