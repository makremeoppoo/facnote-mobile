/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import SegmentedControlTabs from 'react-native-segmented-control-tabs';
import moment from 'moment';
import getIndicator from '../../services/getIndicator';
import getSigIndicator from '../../services/getSigIndicator';
import PageLoader from '../../components/PageLoader/PageLoader';
import {text} from '../../constants';
import ScaleHelpers from '../../Theme/scaleHelpers';
import {fontType} from '../../Theme/AppStyles';
import Rectangle from '../../../assets/images/galery/Rectangle.png';

import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import getExercices from '../../services/getExercices';
import LineChartCustom from '../../components/LineChart/LineChart';
import BarChartCustom from '../../components/BarChart/BarChart';

import styles from './styles';
import {getMaxArrayValue, getMinArrayValue} from '../../shared/utils';

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
      marge: {},
      excedentBrut: {},
      chargePersonel: {},
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
    this.loadIndicateur(exercise.date_debut);
    this.setState({
      exercises,
      exercise,
    });
  }
  async loadIndicateur(date) {
    this.setState({loading: true});

    const indicators = await getIndicator(moment(date).format('YYYY'));

    const sigIndicators = await getSigIndicator(moment(date).format('YYYY'));

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

    const marge = sigIndicators.data.find(
      (item) => item.label == 'Marge commerciale',
    );
    const excedentBrut = sigIndicators.data.find(
      (item) => item.label == "Excédent brut d'exploitation",
    );

    const chargePersonel = sigIndicators.data.find(
      (item) => item.label == 'Charges de personnel',
    );

    this.setState({
      turnover,
      fixedCharge,
      notFixedCharge,
      bankBalance,
      marge,
      excedentBrut,
      chargePersonel,
      loading: false,
    });
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };
  getTurnoverValues = () => {
    const {turnover} = this.state;
    let turnoverValues = Object.values(turnover).slice(3);

    let tab = [];
    let keys = this.getChargeKeys();
    tab = turnoverValues.map((item, index) => {
      return {
        value: Number(item.toFixed(2)),
        month: keys[index],
      };
    });
    return tab;
  };

  getBalancesValues = () => {
    const {bankBalance} = this.state;
    let bankBalanceValues = Object.values(bankBalance).slice(3);

    let tab = [];
    let keys = this.getChargeKeys();
    tab = bankBalanceValues.map((item, index) => {
      let value = 0;
      if (!isNaN(item)) value = Number(item.toFixed(2));
      return {
        value: value,
        month: keys[index],
      };
    });
    return tab;
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

  getMargeValues = () => {
    const {marge} = this.state;
    let margeValues = Object.values(marge).slice(3);

    let tab = [];
    let keys = this.getChargeKeys();
    tab = margeValues.map((item, index) => {
      return {
        value: Number(item.toFixed(2)),
        month: keys[index],
      };
    });
    return tab;
  };

  getExcedentValues = () => {
    const {excedentBrut} = this.state;
    let excedentBrutValues = Object.values(excedentBrut).slice(3);

    let tab = [];
    let keys = this.getChargeKeys();
    tab = excedentBrutValues.map((item, index) => {
      return {
        value: Number(item.toFixed(2)),
        month: keys[index],
      };
    });
    return tab;
  };
  getChargePersonelValues = () => {
    const {chargePersonel} = this.state;
    let chargePersonelValues = Object.values(chargePersonel).slice(2);

    let tab = [];
    let keys = this.getChargeKeys();
    tab = chargePersonelValues.map((item, index) => {
      return {
        value: Number(item.toFixed(2)),
        month: keys[index],
      };
    });
    return tab;
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
    const maxChargeValue = getMaxArrayValue(lineChartChargeValue);
    const minChargeValue = getMinArrayValue(lineChartChargeValue);

    var lineChartTurnoverValue = this.getTurnoverValues();
    const maxTurnoverValue = getMaxArrayValue(lineChartTurnoverValue);
    const minTurnoverValue = getMinArrayValue(lineChartTurnoverValue);

    var barChartBankBalance = this.getBalancesValues();
    const maxBalanceValue = getMaxArrayValue(barChartBankBalance);
    const minBalanceValue = getMinArrayValue(barChartBankBalance);

    var lineChartMargeValue = this.getMargeValues();
    const maxMargeValue = getMaxArrayValue(lineChartMargeValue);
    const minMargeValue = getMinArrayValue(lineChartMargeValue);

    var lineChartExcedentValue = this.getExcedentValues();
    const maxExcedentValue = getMaxArrayValue(lineChartExcedentValue);
    const minExcedentValue = getMinArrayValue(lineChartExcedentValue);

    var lineChartChargePersonelValue = this.getChargePersonelValues();
    const maxChargePersonelValue = getMaxArrayValue(lineChartChargePersonelValue);
    const minChargePersonelValue = getMinArrayValue(lineChartChargePersonelValue);

    return (
      <>
        <NavigationHeader
          title={text.Indicateur}
          powerOff={true}
          showSelectExecices
          exercises={exercises}
          exercise={exercise}
          setExercise={(option) => {
            this.setState({
              exercise: option,
            });
            this.loadIndicateur(option.date_debut);
          }}
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
          {this.state.selectedIndex == 0 && (
            <ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.ChiffreAffaire}</Text>
              </View>
              <View style={styles.chartContent}>
                <LineChartCustom
                  maxValue={maxTurnoverValue}
                  minValue={minTurnoverValue}
                  lineChartValue={lineChartTurnoverValue}
                />
              </View>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.Charge}</Text>
              </View>

              <View style={styles.chartContent}>
                <LineChartCustom
                  maxValue={maxChargeValue}
                  minValue={minChargeValue}
                  lineChartValue={lineChartChargeValue}
                />
              </View>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.SoldeCompte}</Text>
              </View>
              <View style={styles.chartContent}>
                <BarChartCustom
                  maxValue={maxBalanceValue}
                  minValue={minBalanceValue}
                  barValue={barChartBankBalance}
                />
              </View>
            </ScrollView>
          )}
          {this.state.selectedIndex == 1 && (
            <ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.Marge}</Text>
              </View>
              <View style={styles.chartContent}>
                <LineChartCustom
                  maxValue={maxMargeValue}
                  minValue={minMargeValue}
                  lineChartValue={lineChartMargeValue}
                />
              </View>
            </ScrollView>
          )}
          {this.state.selectedIndex == 2 && (
            <ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.Excedent}</Text>
              </View>
              <View style={styles.chartContent}>
                <LineChartCustom
                  maxValue={maxExcedentValue}
                  minValue={minExcedentValue}
                  lineChartValue={lineChartExcedentValue}
                />
              </View>
            </ScrollView>
          )}
          {this.state.selectedIndex == 3 && (
            <ScrollView>
              <View style={styles.titleChartContainer}>
                <Text style={styles.titleChart}>{text.ChargePersonelle}</Text>
              </View>
              <View style={styles.chartContent}>
                <LineChartCustom
                  maxValue={maxChargePersonelValue}
                  minValue={minChargePersonelValue}
                  lineChartValue={lineChartChargePersonelValue}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </>
    );
  }
}

export default HomeScreen;
