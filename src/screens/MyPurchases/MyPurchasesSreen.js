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
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import PDFView from 'react-native-view-pdf';
import Rectangle from '../../../assets/images/Rectangle.png';
import getAchat from '../../services/achat';
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
      source: '',
      dateDebut: null,
      dateFin: null,
      min: '',
      max: '',
      type: {key: 0, label: 'Débit/Crédit', value: 'tous'},
      search_multiple: '',
      comptesBancaire: [],
      exercices: [],
      compte: {key: -1, label: '', value: ''},
      showPdfModal: false,
      exercice: '',
    };
  }

  setDateDebut = (dateDebut) => {
    this.setState({dateDebut});
  };
  setDateFin = (dateFin) => {
    this.setState({dateFin});
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

  onShowPdfModal = (source) => {
    this.setState({
      source,
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
    const {
      limit,
      page,
      dateDebut,
      dateFin,
    
    } = this.state;
    this.setState({
      isRefreshing: true,
    });
    try {
      var achats = await getAchat(limit, page, dateDebut, dateFin);
    } catch (e) {
    } finally {
      let list = [];
      let date = '';
      let counter = 0;
      console.log(achats.purchases[0]);
      await achats.purchases.map((item, index) => {
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
          id: counter++,
          isTitle: false,
          journal: item.journal,
          libelle: item.libelle,
          debit: item.debit,
          credit: item.credit,
          solde: item.solde,
          numFacture: item.numFacture,
          dateEcheance: moment(item.date_echeance).format('DD/MM/YYYY'),
          ttc: item.TTC,
          ht: item.HT,
          tva: item.TVA,
          url: item.url,
        };

        list.push(obj);
      });

      let exercices = [];
      /*achats.exercices.map((item, index) => {
        exercices.push({
          key: index++,
          label: `${moment(item.date_debut).format('DD/MM/YYYY')} au ${moment(
            item.date_fin,
          ).format('DD/MM/YYYY')}`,
          date_debut: item.date_debut,
          date_fin: item.date_fin,
        });
      })*;/*/
      this.setState({list, exercices, isRefreshing: false});
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

  renderItem = ({item}) => <CardView onShowPdfModal={this.onShowPdfModal} item={item} />;

  render() {
    const {list, isRefreshing, exercices,source} = this.state;
    let index = 0;
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
                        initialDate={this.state.dateDebut}
                        setCurrentDate={this.setDateDebut}
                        label={text.dateDebut}
                        display={'column'}
                      />
                      <DatePicker
                        initialDate={this.state.dateFin}
                        setCurrentDate={this.setDateFin}
                        label={text.dateFin}
                        display={'column'}
                      />
                    </View>

                    <SelectInput
                      label={text.periode}
                      selectedValue={this.state.exercice.label}
                      onChange={(option) => {
                        this.setState({
                          dateFin: option.date_fin,
                          dateDebut: option.date_debut,
                          exercice: option,
                        });
                      }}
                      listItems={exercices}
                    />
                    <View style={styles.ButtonsContain}>
                      <SecondButton
                        label={text.Reinitialiser}
                        loading={this.state.loading}
                        onPress={async () => {
                          await this.setState({
                            min: '',
                            max: '',
                            dateDebut: null,
                            dateFin: null,
                            search_multiple: '',
                            exercice: '',
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
              <ImageBackground
                source={Rectangle}
                style={styles.backgroundModalStyle}></ImageBackground>

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
export default connect(mapStateToProps)(MyPurchasesSreen);
