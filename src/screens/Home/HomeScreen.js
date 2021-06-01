/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, Image} from 'react-native';
import {LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import SegmentedControlTabs from 'react-native-segmented-control-tabs';
import moment from 'moment';
import getIndicator from '../../services/getIndicator';
import PageLoader from '../../components/PageLoader/PageLoader';
import {text} from '../../constants';
import {primaryColor} from '../../Theme/AppStyles';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {fontType} from '../../Theme/AppStyles';
import Rectangle from '../../../assets/images/galery/Rectangle.png';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import getExercices from '../../services/getExercices';
import CustomGrid from '../../components/CustomGrid/CostumGrid';

import styles from './styles';
import {getMaxArryaValue, getMinArryaValue} from '../../shared/utils';

const axesSvg = {fontSize: 10, fill: 'grey'};
const verticalContentInset = {top: 10, bottom: 10};

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      loading: false,
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
    this.setState({loading: true});
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
      loading: false,
    });
  }
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };
  getChargeValues = () => {
    const {fixedCharge, notFixedCharge} = this.state;
    let fixedChargeValues = Object.values(fixedCharge).slice(3);
    let notFixedChargeValues = Object.values(notFixedCharge).slice(3);
    let tab = [];

    let keys = this.getChargeKeys();

    tab = fixedChargeValues.map((item, index) => {
      return {
        value: Number((item + notFixedChargeValues[index]).toFixed(2)),
        month: keys[index],
      };
    });

    return tab;
  };
  getChargeKeys = (index = null) => {
    const {notFixedCharge} = this.state;
    let tab = Object.keys(notFixedCharge).slice(3);
    if (index != null) {
      return tab[index];
    } else {
      return tab;
    }
  };

  render() {
    const {
      exercise,
      exercises,
      turnover,
      fixedCharge,
      notFixedCharge,
      bankBalance,
      loading,
    } = this.state;

    var lineChartChargeValue = this.getChargeValues();
    const maxChargeValue = getMaxArryaValue(lineChartChargeValue);
    const minChargeValue = getMinArryaValue(lineChartChargeValue);

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
          {loading && (
            <PageLoader showBackground={true} size="large" color="#0000ff" />
          )}
          <SegmentedControlTabs
            values={[
              <>
                {this.state.selectedIndex == 0 && (
                  <Image style={styles.shadeImage} source={Rectangle} />
                )}
                <Text
                  style={{
                    color: this.state.selectedIndex == 0 ? 'white' : 'grey',
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    fontFamily: fontType.bold,
                    fontSize: ScaleHelpers.CalcWidth(2.8),
                  }}>
                  {text.IndicateurCle}
                </Text>
              </>,
              <>
                {this.state.selectedIndex == 1 && (
                  <Image style={styles.shadeImage} source={Rectangle} />
                )}
                <Text
                  style={{
                    color: this.state.selectedIndex == 1 ? 'white' : 'grey',
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    fontFamily: fontType.bold,
                    fontSize: ScaleHelpers.CalcWidth(2.8),
                  }}>
                  {text.Marge}
                </Text>
              </>,
              <>
                {this.state.selectedIndex == 2 && (
                  <Image style={styles.shadeImage} source={Rectangle} />
                )}
                <Text
                  style={{
                    color: this.state.selectedIndex == 2 ? 'white' : 'grey',
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    fontFamily: fontType.bold,
                    fontSize: ScaleHelpers.CalcWidth(2.8),
                  }}>
                  {text.Excedent}
                </Text>
              </>,
              <>
                {this.state.selectedIndex == 3 && (
                  <Image style={styles.shadeImage} source={Rectangle} />
                )}
                <Text
                  style={{
                    color: this.state.selectedIndex == 3 ? 'white' : 'grey',
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    fontFamily: fontType.bold,
                    fontSize: ScaleHelpers.CalcWidth(2.8),
                  }}>
                  {text.ChargePersonelle}
                </Text>
              </>,
            ]}
            handleOnChangeIndex={this.handleIndexChange}
            activeIndex={this.state.selectedIndex}
            tabsContainerStyle={{
              height: ScaleHelpers.CalcHeight(7),
              marginTop: ScaleHelpers.CalcHeight(2),
              marginHorizontal: ScaleHelpers.CalcWidth(0.5),
            }}
            tabStyle={styles.tabStyle}
          />
          <View style={styles.valueCardContainer}>
            <View style={styles.valueCardrowContainer}>
              <Text style={[styles.itemValue, {color: '#4EC7F5'}]}>
                {bankBalance.total?.toFixed(2)}
              </Text>
              <Text style={[styles.itemValue, {color: '#EA4C89'}]}>
                {turnover.total?.toFixed(2)}
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
              data={lineChartChargeValue}
              style={{marginBottom: 0}}
              contentInset={verticalContentInset}
              svg={axesSvg}
              numberOfTicks={10}
              min={minChargeValue - minChargeValue / 4}
              yAccessor={({item}) => item.value}
              formatLabel={(value) => value}
              max={maxChargeValue}
            />
            <View style={{flex: 1, marginLeft: 10}}>
              <LineChart
                style={{flex: 1}}
                data={lineChartChargeValue}
                yAccessor={({item}) => item.value}
                svg={{
                  stroke: '#4CC418',
                  strokeWidth: 2,
                }}
                curve={shape.curveLinear}>
                <CustomGrid />
              </LineChart>
              <XAxis
                data={lineChartChargeValue}
                formatLabel={(_, index) => lineChartChargeValue[index].month}
                contentInset={{left: 10, right: 10}}
                svg={{
                  fill: 'grey',
                  fontSize: 10,
                }}
              />
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default HomeScreen;
