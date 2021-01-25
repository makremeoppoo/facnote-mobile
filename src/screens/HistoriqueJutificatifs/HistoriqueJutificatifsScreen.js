/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import moment from 'moment';
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import getHistory from '../../services/history';

import CardView from '../../components/CardView/CardView';
import Camera from '../../../assets/icons/Camera.png';
import Close from '../../../assets/icons/closeGrey.png';

import styles from './styles';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      list: [],
      limit: 10,
      page: 1,
      isRefreshing: true,
      hasScrolled: false,
    };
  }
  onScroll = () => {
    this.setState({hasScrolled: true});
  };

  loadData = async () => {
    const {limit, page} = this.state;
    try {
      var history = await getHistory(limit, page);
    } catch (e) {
      console.log(e);
    } finally {
      const sortedHistory = history.sort(
        (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf(),
      );
      let list = [];
      let date = '';
      let counter = 0;
      sortedHistory.map((item, index) => {
        let newDate = moment(item.send_date).format('DD/MM/YYYY');
        if (date != newDate) {
          date = newDate;
          list.push({id: counter++, text: date, isTitle: true});
        }

        let obj = {
          id: counter++,
          date: newDate,
          procent: item.amount,
          title: 'recu le',
          icon: Camera,
          isTitle: false,
        };
        list.push(obj);
      });
      this.setState({list, isRefreshing: false});
    }
  };

  handleRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
        limit: 10,
        page: 1,
      },
      () => {
        this.loadData();
      },
    );
  };

  handleLoadMore = () => {
  

    this.setState(
      {
        limit: this.state.limit + 10,
      },
      () => {
        this.loadData();
      },
    );
  };

  componentDidMount() {
    this.loadData();
  }

  initData = async () => {};

  renderItem = ({item}) => <CardView item={item} />;

  render() {
    const {list, isRefreshing, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => this.setState({showModal: !this.state.showModal})}
          underlayColor="rgba(73,182,77,1,0.9)">
          <View style={styles.itemContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.itemTitle}>Filter</Text>
            </View>
          </View>
        </TouchableHighlight>
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={3}
          refreshing={isRefreshing}
          onRefresh={() => this.handleRefresh()}
          onScrollEndDrag={this.handleLoadMore}
          onEndThreshold={0}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={styles.modalCloseView}
                onPress={() =>
                  this.setState({showModal: !this.state.showModal})
                }
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.closeImg} source={Close} />
              </TouchableHighlight>
              <View></View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(HomeScreen);
