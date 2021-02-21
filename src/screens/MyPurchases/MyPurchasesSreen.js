/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import moment from 'moment';
import {
  View,
  TouchableHighlight,
  FlatList,
  Modal,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import PDFView from 'react-native-view-pdf';
import Rectangle from '../../../assets/images/Rectangle.png';
import getPurchases from '../../services/purchase';
import DatePicker from '../../components/DatePicker/DatePicker';
import SelectInput from '../../components/SelectInput/SelectInput';
import CardView from '../../components/CardView/CardViewPurchase';
import PageLoader from '../../components/PageLoader/PageLoader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import SecondButton from '../../components/SecondButton/SecondButton';
import Close from '../../../assets/icons/closeGrey.png';
import {text} from '../../constants';

import styles from './styles';

class MyPurchasesSreen extends React.Component {
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
      startDate: null,
      endDate: null,
      search_multiple: '',
      showPdfModal: false,
      purchase: {},
    };
  }

  setStartDate = (startDate) => {
    this.setState({startDate});
  };
  setEndDate = (endDate) => {
    this.setState({endDate});
  };
  setField = (text, name) => {
    this.setState({[name]: text});
  };

  onShowModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      loading: true,
    });
  };
  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onShowPdfModal = (item) => {
    console.log(item);
    this.setState({
      purchase: item,
      showPdfModal: !this.state.showPdfModal,
      loading: true,
    });
  };
  onClosePdfModal = () => {
    this.setState({
      showPdfModal: false,
    });
  };

  onScroll = () => {
    this.setState({hasScrolled: true});
  };

  loadData = async () => {
    const {limit, page, startDate, endDate} = this.state;
    this.setState({
      isRefreshing: true,
    });
    try {
      var data = await getPurchases(limit, page, startDate, endDate);
    } catch (e) {
      this.setState({list:[], isRefreshing: false});

    } finally {
      let list = [];
      let date = '';
      let counter = 0;
      await data.purchases.map((item, index) => {
        let newDate = moment(item.date).format('DD/MM/YYYY');
        if (date != newDate) {
          date = newDate;
          list.push({
            id: counter++,
            text: newDate == 'Invalid date' ? '' : newDate,
            isTitle: true,
          });
        }
        let obj = {
          ...item,
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
    if (!this.state.isRefreshing)
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
    <CardView onShowPdfModal={this.onShowPdfModal} item={item} />
  );

  render() {
    const {list, isRefreshing, purchase} = this.state;
    let index = 0;
    const resourceType = 'url';

    const resources = {
      file:
        Platform.OS === 'ios'
          ? 'downloadedDocument.pdf'
          : '/sdcard/Download/downloadedDocument.pdf',
      url: this.state.purchase.url,
      base64: 'JVBERi0xLjMKJcfs...',
    };
    return (
      <View style={styles.container}>
        <SecondButton
          label={text.filter}
          onPress={() => this.setState({showModal: !this.state.showModal})}
        />
        {isRefreshing && (
          <PageLoader showBackground={true} size="large" color="#0000ff" />
        )}
        <FlatList
          style={styles.flatListStyle}
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={styles.modalCloseView}
                onPress={() => this.onCloseModal()}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.closeImg} source={Close} />
              </TouchableHighlight>
              <View style={styles.modalContainer}>
                <ScrollView>
                  <View style={styles.modalContant}>
                    <View style={{flexDirection: 'row'}}>
                      <DatePicker
                        initialDate={this.state.startDate}
                        setCurrentDate={this.setStartDate}
                        label={text.startDate}
                        display={'column'}
                      />
                      <DatePicker
                        initialDate={this.state.endDate}
                        setCurrentDate={this.setEndDate}
                        label={text.endDate}
                        display={'column'}
                      />
                    </View>

                    <View style={styles.ButtonsContain}>
                      <SecondButton
                        label={text.Reinitialiser}
                        loading={this.state.loading}
                        onPress={async () => {
                          await this.setState({
                            min: '',
                            max: '',
                            startDate: null,
                            endDate: null,
                            search_multiple: '',
                            compte: {key: -1, label: '', value: ''},
                          });
                          await this.handleRefresh();
                          await this.onCloseModal();
                        }}
                      />
                      <SubmitButton
                        loading={this.state.loading}
                        label={text.Valider}
                        onPress={async () => {
                          await this.handleRefresh();
                          await this.onCloseModal();
                        }}
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showPdfModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={styles.modalCloseView}
                onPress={() => this.onClosePdfModal()}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.closeImg} source={Close} />
              </TouchableHighlight>
              <View style={styles.pdfContainer}>
                {this.state.loading && (
                  <PageLoader
                    showBackground={false}
                    size="large"
                    color="#0000ff"
                  />
                )}
                <View style={styles.titleModalContainer}>
                  <Text style={styles.titleModalText}>
                    N°{purchase.numFacture}
                  </Text>
                </View>
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
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={[styles.textInfo, styles.widthTextInfo]}>
                      Montant
                    </Text>
                    <Text style={[styles.textInfo, styles.widthTextInfo]}>
                      Description
                    </Text>
                    <Text style={[styles.textInfo, styles.widthTextInfo]}>
                      Date
                    </Text>
                    <Text style={[styles.textInfo, styles.widthTextInfo]}>
                      Echéance
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.textInfo}>{purchase.TTC + ' €'}</Text>
                    <Text style={styles.textInfo}>{purchase.libelle}</Text>
                    <Text style={styles.textInfo}>
                      {purchase.date
                        ? moment(purchase.date).format('DD/MM/YYYY')
                        : ''}
                    </Text>
                    <Text style={styles.textInfo}>
                      {purchase.dateEcheance
                        ? moment(purchase.dateEcheance).format('DD/MM/YYYY')
                        : ''}
                    </Text>
                  </View>
                </View>
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
export default connect(mapStateToProps)(MyPurchasesSreen);
