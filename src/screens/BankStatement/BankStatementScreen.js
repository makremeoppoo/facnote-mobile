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

import getEnterprise from '../../services/bankStatement';
import DatePicker from '../../components/DatePicker/DatePicker';
import TextInput from '../../components/TextInput/TextInput';
import TextAreaInput from '../../components/TextAreaInput/TextInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import CardView from '../../components/CardView/CardViewReleveBanquaire';
import PageLoader from '../../components/PageLoader/PageLoader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import SecondButton from '../../components/SecondButton/SecondButton';
import Close from '../../../assets/icons/closeGrey.png';
import {text} from '../../constants';

import styles from './styles';

class BankStatementScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showActionModal: false,

      list: [],
      limit: 10,
      page: 1,
      loading: false,
      isRefreshing: true,
      hasScrolled: false,
      source: '',
      startDate: null,
      endDate: null,
      min: '',
      max: '',
      type: {key: 0, label: 'Débit/Crédit', value: 'tous'},
      multipleSearch: '',
      bankAccounts: [],
      exercices: [],
      account: {key: -1, label: '', value: ''},
      exercice: '',
    };
  }

  setStartDate = (startDate) => {
    this.setState({startDate});
  };
  setDateFin = (endDate) => {
    this.setState({endDate});
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
      startDate,
      endDate,
      min,
      max,
      multipleSearch,
      type,
      account,
    } = this.state;
    this.setState({
      isRefreshing: true,
    });
    try {
      var statements = await getEnterprise(
        limit,
        page,
        startDate,
        endDate,
        min,
        max,
        multipleSearch,
        type.value,
        account.value,
      );
    } catch (e) {
      console.log(e);
    } finally {
      let list = [];
      let date = '';
      let counter = 0;
      console.log(statements.comptes);

      await statements.ecritures.map((item, index) => {
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
          value: item.montant,
          solde: item.solde,
          nom_banque: item.nom_banque,
        };

        list.push(obj);
      });

      let bankAccounts = [{key: -1, label: 'Tous les comptes', value: ''}];
      console.log(statements.comptes);
      /* statements.comptes.map((item, index) => {
        bankAccounts.push({
          key: index++,
          value: item.id,
          label: item.name,
        });
      });*/
      let exercices = [];
      statements.exercices.map((item, index) => {
        exercices.push({
          key: index++,
          label: `${moment(item.date_debut).format('DD/MM/YYYY')} au ${moment(
            item.date_fin,
          ).format('DD/MM/YYYY')}`,
          date_debut: item.date_debut,
          date_fin: item.date_fin,
        });
      });
      this.setState({list, bankAccounts, exercices, isRefreshing: false});
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
    <CardView
      onShowModal={() => {
        this.setState({
          showActionModal: !this.state.showActionModal,
        });
      }}
      item={item}
    />
  );
  renderFilter = () => (
    <View style={styles.modalContant}>
      <TextInput
        style={styles.input}
        label={text.searchReleveBanquaire}
        value={this.state.multipleSearch}
        onChangeText={(text, name) => this.setField(text, 'search_multiple')}
        name="search_multiple"
        type="text"
      />
      <View style={{flexDirection: 'row'}}>
        <DatePicker
          initialDate={this.state.startDate}
          setCurrentDate={this.setStartDate}
          label={text.startDate}
          display={'column'}
        />
        <DatePicker
          initialDate={this.state.endDate}
          setCurrentDate={this.setDateFin}
          label={text.endDate}
          display={'column'}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          label={text.min}
          value={this.state.min}
          onChangeText={(text, name) => this.setField(text, 'min')}
          name="min"
          type="number"
          grid={'column'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          label={text.max}
          onChangeText={(text, name) => this.setField(text, 'max')}
          value={this.state.max}
          name="max"
          type="number"
          grid={'column'}
          keyboardType="numeric"
        />
      </View>

      <SelectInput
        label={text.periode}
        selectedValue={this.state.exercice.label}
        onChange={(option) => {
          this.setState({
            endDate: option.date_fin,
            startDate: option.date_debut,
            exercice: option,
          });
        }}
        listItems={this.state.exercices}
      />
      <SelectInput
        label={text.compte}
        selectedValue={this.state.account.label}
        onChange={(option) => {
          this.setState({account: option});
        }}
        listItems={this.state.bankAccounts}
      />

      <SelectInput
        label={text.Type}
        selectedValue={this.state.type.label}
        onChange={(option) => {
          this.setState({type: option});
        }}
        listItems={[
          {key: 0, label: 'Débit/Crédit', value: 'tous'},
          {key: 1, label: 'Débit', value: 'debit'},
          {key: 2, label: 'Crédit', value: 'credit'},
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
              startDate: null,
              endDate: null,
              multipleSearch: '',
              exercice: '',
              account: {key: -1, label: '', value: ''},
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
  );
  renderActionForm = () => {
    const {selectedIndex} = this.state;
    return (
      <View style={[styles.modalContant]}>
        <TextAreaInput
          label={"Message"}
          value={this.state.multipleSearch}
          onChangeText={(text, name) => this.setField(text, 'search_multiple')}
          name="search_multiple"
          type="text"
        />

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
                multipleSearch: '',
                exercice: '',
                account: {key: -1, label: '', value: ''},
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
    );
  };

  render() {
    const {list, isRefreshing} = this.state;
    let index = 0;
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
                <ScrollView>{this.renderFilter()}</ScrollView>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showActionModal}>
          {this.state.loading && (
            <PageLoader showBackground={false} size="large" color="#0000ff" />
          )}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={styles.modalCloseView}
                onPress={() =>
                  this.setState({
                    showActionModal: !this.state.showActionModal,
                  })
                }
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.closeImg} source={Close} />
              </TouchableHighlight>
              <View style={styles.modalContainer}>
                <ScrollView>{this.renderActionForm()}</ScrollView>
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
export default connect(mapStateToProps)(BankStatementScreen);
