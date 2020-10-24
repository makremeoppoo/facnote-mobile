/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from './styles';
import LineChartView from '../../components/LineChartView/LineChartView';
import {
  lineChartData,
  lineChartConfig,
  lineChartTables,
} from '../../data/dataArrays';
import BackButton from '../../components/BackButton/BackButton';
import CardView from '../../components/CardView/CardView';
import {connect} from 'react-redux';

class AllAssetsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChart: 0,
    };
  }

  onPressBinocular = () => {
    const title = this.props.route.params?.title;
    this.props.navigation.navigate('AssetsWatchListScreen', {
      type: title,
      array: title == 'Stocks' ? this.props.stocks : this.props.crypto,
    });
  };

  renderItem = ({ item }) => (
    <CardView
      onPress={() =>
        this.props.navigation.navigate('AssetScreen', {
          item,
          type: this.props.route.params?.title,
          changeWatchList:
            this.props.route.params?.title == 'Stocks'
              ? this.props.changeWatchListStock
              : this.props.changeWatchListCrypto,
        })
      }
      item={item}
    />
  );

  render() {
    const array = this.props.route.params?.array;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.chartContainer}>
          <LineChartView
            lineChartData={lineChartData}
            lineChartConfig={lineChartConfig}
            lineChartTables={lineChartTables}
          />
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={array}
            renderItem={this.renderItem}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            listKey="0"
          />
        </View>
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeWatchListStock: id => dispatch({ type: 'CHANGE_WATCHLIST_STOCK', id }),
    changeWatchListCrypto: id => dispatch({ type: 'CHANGE_WATCHLIST_CRYPTO', id })
  };
}

function mapStateToProps(state) {
  return {
    stocks: state.stocks.stocksArray,
    crypto: state.crypto.cryptoArray
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllAssetsScreen);
