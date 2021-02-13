/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import moment from 'moment';
import {
  View,
  TouchableHighlight,
  FlatList,
  Modal,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import getEnterprise from '../../services/entreprise';
import DatePicker from '../../components/DatePicker/DatePicker';
import TextInput from '../../components/TextInput/TextInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import CardView from '../../components/CardView/CardViewReleveBanquaire';
import PageLoader from '../../components/PageLoader/PageLoader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import SecondButton from '../../components/SecondButton/SecondButton';
import Close from '../../../assets/icons/closeGrey.png';
import {text} from '../../constants';
import {blueColor} from '../../AppStyles';

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
      dateDebut: null,
      dateFin: null,
      min: '',
      max: '',
      type: '',
      numero_compte_search: '',
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

  onShowModal = (source) => {
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

  onScroll = () => {
    this.setState({hasScrolled: true});
  };

  loadData = async () => {
    const {
      limit,
      page,
      dateDebut,
      dateFin,
      min,
      max,
      numero_compte_search,
    } = this.state;
    this.setState({
      isRefreshing: true,
    });
    try {
      var releves = await getEnterprise(
        limit,
        page,
        dateDebut,
        dateFin,
        min,
        max,
        numero_compte_search,
      );
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
          solde: item.solde,
          nom_banque: item.nom_banque,
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
    let index = 0;
    return (
      <View style={styles.container}>
        {isRefreshing && (
          <PageLoader showBackground={true} size="large" color="#0000ff" />
        )}
        <SecondButton
          label={text.filter}
          onPress={() => this.setState({showModal: !this.state.showModal})}
        />
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
          {this.state.loading && (
            <PageLoader showBackground={false} size="large" color="#0000ff" />
          )}
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
                    <TextInput
                      style={styles.input}
                      label={text.searchReleveBanquaire}
                      value={this.state.numero_compte_search}
                      onChangeText={(text, name) =>
                        this.setField(text, 'numero_compte_search')
                      }
                      name="numero_compte_search"
                      type="text"
                    />
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
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                        style={styles.input}
                        label={text.min}
                        value={this.state.min}
                        onChangeText={(text, name) =>
                          this.setField(text, 'min')
                        }
                        name="min"
                        type="number"
                        grid={'column'}
                        keyboardType="numeric"
                      />
                      <TextInput
                        style={styles.input}
                        label={text.max}
                        onChangeText={(text, name) =>
                          this.setField(text, 'max')
                        }
                        value={this.state.max}
                        name="max"
                        type="number"
                        grid={'column'}
                        keyboardType="numeric"
                      />
                    </View>

                    <SelectInput
                      label={text.Type}
                      selectedValue={this.state.type}
                      onChange={(option) => {
                        console.log(option);
                        this.setState({type: option});
                      }}
                      listItems={[
                        {key: index++, label: 'Moto P < 50 CC', value: '1'},
                        {key: index++, label: 'Moto P < 3CV', value: '2'},
                        {key: index++, label: 'Moto P < 6CV', value: '3'},
                        {key: index++, label: 'Moto P > 5CV', value: '4'},
                        {
                          key: index++,
                          label: 'Automobile P <  3CV',
                          value: '5',
                        },
                        {key: index++, label: 'Automobile P = 4CV', value: '6'},
                        {key: index++, label: 'Automobile P = 5CV', value: '7'},
                        {key: index++, label: 'Automobile P = 6CV', value: '8'},
                        {key: index++, label: 'Automobile P > 6CV', value: '9'},
                      ]}
                    />
                    <SelectInput
                      label={text.compte}
                      selectedValue={this.state.compte}
                      onChange={(option) => {
                        console.log(option);
                        this.setState({compte: option});
                      }}
                      listItems={[
                        {key: index++, label: 'Moto P < 50 CC', value: '1'},
                        {key: index++, label: 'Moto P < 3CV', value: '2'},
                        {key: index++, label: 'Moto P < 6CV', value: '3'},
                        {key: index++, label: 'Moto P > 5CV', value: '4'},
                        {
                          key: index++,
                          label: 'Automobile P <  3CV',
                          value: '5',
                        },
                        {key: index++, label: 'Automobile P = 4CV', value: '6'},
                        {key: index++, label: 'Automobile P = 5CV', value: '7'},
                        {key: index++, label: 'Automobile P = 6CV', value: '8'},
                        {key: index++, label: 'Automobile P > 6CV', value: '9'},
                      ]}
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
                            numero_compte_search: '',
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
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(ReleveBanqueScreen);
