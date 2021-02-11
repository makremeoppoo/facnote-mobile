/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import moment from 'moment';
import {
  View,
  TouchableHighlight,
  FlatList,
  Modal,
  ImageBackground,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Rectangle from '../../../assets/images/Rectangle.png';

import getEnterprise from '../../services/entreprise';

import CardView from '../../components/CardView/CardViewReleveBanquaire';
import PageLoader from '../../components/PageLoader/PageLoader';

import Close from '../../../assets/icons/closeGrey.png';

import styles from './styles';

class ReleveBanqueScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      list: [],
      limit: 10,
      page: 1,
      loading: false,
      isRefreshing: true,
      hasScrolled: false,
      source: '',
    };
  }

  onShowModal = (source) => {
    this.setState({
      source,
      showModal: !this.state.showModal,
      loading: true,
    });
  };
  onCloseModal = () => {
    this.setState({
      source: '',
      showModal: false,
      loading: false,
    });
  };

  onScroll = () => {
    this.setState({hasScrolled: true});
  };

  loadData = async () => {
    const {limit, page} = this.state;
    this.setState({
      isRefreshing: true,
    });
    try {
      var releves = await getEnterprise(limit, page);
    } catch (e) {
      console.log(e);
    } finally {
      let list = [];
      let date = '';
      let counter = 0;
      console.log('========', releves.raw_ecritures[0]);
      
      await releves.raw_ecritures.map((item, index) => {
        let newDate = moment(item.date_operation).format('DD/MM/YYYY');
        if (date != newDate) {
          date = newDate;
          list.push({
            id: counter++,
            text: newDate == 'Invalid date' ? '' : newDate,
            isTitle: true,
          });
        }
        let obj = {
          id: counter++,
          isTitle: false,     
          libelle: item.libelle,
          debit: item.debit,
          credit: item.credit,


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

  renderItem = ({item}) => (
    <CardView onShowModal={this.onShowModal} item={item} />
  );

  render() {
    const {list, isRefreshing, source} = this.state;
    return (
      <View style={styles.container}>
        {isRefreshing && (
          <PageLoader showBackground={true} size="large" color="#0000ff" />
        )}
        <FlatList
          data={list}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={3}
          refreshing={false}
          // onRefresh={() => this.handleRefresh()}
          onScrollEndDrag={this.handleLoadMore}
          onEndThreshold={0}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}>
          {this.state.loading && (
            <PageLoader showBackground={false} size="large" color="#0000ff" />
          )}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageBackground
                source={Rectangle}
                style={styles.backgroundModalStyle}></ImageBackground>

              <TouchableHighlight
                style={styles.modalCloseView}
                onPress={() => this.onCloseModal()}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.closeImg} source={Close} />
              </TouchableHighlight>
              <View style={styles.pdfContainer}>
              
              </View>
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
export default connect(mapStateToProps)(ReleveBanqueScreen);
