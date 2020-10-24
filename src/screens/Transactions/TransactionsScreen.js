/* eslint-disable comma-dangle */
import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import TransactionView from '../../components/TransactionView/TransactionView';

export default class StockScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => <TransactionView item={item} />;

  render() {
    const payments = this.props.route.params?.payments;
    return (
      <ScrollView style={styles.container}>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={payments}
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
