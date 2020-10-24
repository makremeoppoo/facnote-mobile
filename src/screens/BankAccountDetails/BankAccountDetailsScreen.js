/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import LineChartView from '../../components/LineChartView/LineChartView';
import { lineChartData, lineChartConfig, lineChartTables } from '../../data/dataArrays';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import TransactionView from '../../components/TransactionView/TransactionView';

export default class BankAccountDetalisScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChart: 0
    };
  }

  onPressItem = () => {};

  renderItem = ({ item }) => <TransactionView item={item} />;

  render() {
    const item = this.props.route.params?.item;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.chartContainer}>
          <LineChartView
            lineChartData={lineChartData}
            lineChartConfig={lineChartConfig}
            lineChartTables={lineChartTables}
          />
          <View style={styles.facilitieContainer}>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={item.payments}
              renderItem={this.renderItem}
              extraData={this.state}
              keyExtractor={item => `${item.id}`}
              listKey="0"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
