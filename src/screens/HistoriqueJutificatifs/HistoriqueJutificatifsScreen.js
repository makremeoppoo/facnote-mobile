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
  ImageBackground,
  ActivityIndicator,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import PDFView from 'react-native-view-pdf';
import Rectangle from '../../../assets/images/Rectangle.png';

import getHistory from '../../services/history';

import CardView from '../../components/CardView/CardView';
import PageLoader from '../../components/PageLoader/PageLoader';

import Camera from '../../../assets/icons/Camera.png';
import Close from '../../../assets/icons/closeGrey.png';

import styles from './styles';

class HistoryScreen extends React.Component {
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
      var history = await getHistory(limit, page);
    } catch (e) {
      console.log(e);
    } finally {
      let list = [];
      let date = '';
      let counter = 0;

      await history.map((item, index) => {
        let newDate = item.send_date.split(' ')[0];
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
          date: newDate == 'Invalid date' ? '' : newDate,
          procent: item.amount,
          title: 'recu le',
          icon: Camera,
          isTitle: false,
          status: item.status,
          status_label: item.status_label,
          bill_number: item.bill_number,
          source: item.source,
          label: item.label,
          type: item.type,
          path: item.received_file_url,
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
    const resourceType = 'url';
    const resources = {
      file:
        Platform.OS === 'ios'
          ? 'downloadedDocument.pdf'
          : '/sdcard/Download/downloadedDocument.pdf',
      url: source,
      base64: 'JVBERi0xLjMKJcfs...',
    };
    return (
      <View style={styles.container}>
        {isRefreshing && <PageLoader showBackground={true} size="large" color="#0000ff" />}
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
          {this.state.loading && <PageLoader showBackground={false} size="large" color="#0000ff" />}
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
                <PDFView
                  style={styles.pdf}
                  fadeInDuration={250.0}
                  resource={resources[resourceType]}
                  resourceType={resourceType}
                  onLoad={() => {
                    this.setState({loading: false});
                    console.log(`PDF rendered from ${resourceType}`);
                  }}
                  onError={(error) => {
                    this.setState({loading: false});
                    console.log('Cannot render PDF', error);
                  }}
                />
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
export default connect(mapStateToProps)(HistoryScreen);
