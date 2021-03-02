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
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-toast-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';
import getBankStatement from '../../services/bankStatement';
import getAccountsBank from '../../services/accountsBank';
import sendComment from '../../services/sendComment';

import DatePicker from '../../components/DatePicker/DatePicker';
import TextInput from '../../components/TextInput/TextInput';
import TextAreaInput from '../../components/TextAreaInput/TextInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import BankCard from '../../components/CardView/BankCard';
import PageLoader from '../../components/PageLoader/PageLoader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import SecondButton from '../../components/SecondButton/SecondButton';
import Close from '../../../assets/icons/closeGrey.png';
import {text} from '../../constants';
import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';

import styles from './styles';
import {acc} from 'react-native-reanimated';
const billTypeArray = ['perdue', 'personnelle', 'autres'];
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
      billType: '',
      bankId: '',
      comment: '',
      justificatif: true,
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

  showActionSheet = (item) => {
    this.setState({bankId: item.id});
    this.Standard.open();
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
      var statements = await getBankStatement(
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

      await statements.ecritures.map((item, index) => {
        let newDate = moment(item.date_operation).format('DD/MM/YYYY');
        if (date != newDate) {
          date = newDate;
          list.push({
            counter: counter++,
            text: newDate == 'Invalid date' ? '' : newDate,
            isTitle: true,
          });
        }

        let obj = {
          counter: counter++,
          isTitle: false,
          ...item,
          value: item.montant,
        };

        list.push(obj);
      });

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
      this.setState({list, exercices, isRefreshing: false});
    }
  };

  sendComment = async () => {
    const {comment, bankId, billType} = this.state;

    try {
      await sendComment(comment, bankId, billType);
    } catch (e) {
      console.log(e);
    } finally {
      Toast.show({
        text1: 'Felicitation',
        text2: 'Votre message a été envoyé',
        type: 'success',
      });
      this.setState({showActionModal: false});
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

  async componentDidMount() {
    var accounts = await getAccountsBank(100, 1);
    let bankAccounts = [];
    accounts.map((item, index) => {
      bankAccounts.push({
        key: index++,
        value: item.iban,
        label: item.banque,
      });
    });
    this.setState({bankAccounts, account: bankAccounts[0]});
    this.loadData();
  }

  handleActionSheetPress = (index) => {
    this.setState({billType: billTypeArray[index], showActionModal: true});
  };

  renderItem = ({item}) => (
    <View>
      <BankCard
        key={item.counter}
        onShowModal={() => {
          if (
            item.associer == null &&
            item.justificatif &&
            item.facture_tag == null
          ) {
            this.showActionSheet(item);
            return;
          }
          this.showActionSheet(item);

          return;
        }}
        item={item}
      />
    </View>
  );
  getData = () => {
    if (this.state.justificatif) return this.state.list;
    else
      return this.state.list.filter(
        (item) =>
          (item.associer == null &&
            item.justificatif &&
            item.facture_tag == null) ||
          item.isTitle,
      );
  };
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
          label={text.dateDebut}
          display={'column'}
        />
        <DatePicker
          initialDate={this.state.endDate}
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
    return (
      <View style={[styles.modalContant]}>
        <TextAreaInput
          label={'Message'}
          value={this.state.comment}
          onChangeText={(text, name) => this.setField(text, 'comment')}
          type="text"
        />

        <View style={styles.ButtonsContain}>
          <SecondButton
            label={text.Annuler}
            loading={this.state.loading}
            onPress={async () => {
              await this.setState({
                showActionModal: false,
              });
            }}
          />
          <SubmitButton
            loading={this.state.loading}
            label={text.Valider}
            onPress={async () => {
              await this.sendComment();
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const {list, isRefreshing, account} = this.state;

    return (
      <>
        <Toast ref={(ref) => Toast.setRef(ref)} style={{elevation: 11}} />

        <NavigationHeader
          onPress={() => {
            // this.props.navigation.goBack();
            this.Standard.open();
          }}
          title={text.banque}
          subTitle={account.label}
          onPressTwo={() => this.setState({showModal: !this.state.showModal})}
        />
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.soldeTitle}>{list[1]?.solde} €</Text>
            <Text style={styles.dateTitle}>
              {text.SoldeAu} {list[0]?.text}
            </Text>
            <TouchableHighlight
              style={styles.filterTitle}
              onPress={() =>
                this.setState({justificatif: !this.state.justificatif})
              }
              underlayColor="rgba(73,182,77,1,0.9)">
              <Text style={styles.filterTitle}>
                {this.state.justificatif
                  ? text.transactionJustifier
                  : text.transactionNonJustifier}
              </Text>
            </TouchableHighlight>
          </View>
          {isRefreshing && (
            <PageLoader showBackground={true} size="large" color="#0000ff" />
          )}
          <FlatList
            style={styles.flatListStyle}
            data={this.getData()}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.counter}
            initialNumToRender={3}
            refreshing={false}
            // onRefresh={() => this.handleRefresh()}
            onScrollEndDrag={this.handleLoadMore}
            onEndThreshold={0}
          />
          <RBSheet
            ref={(ref) => {
              this.Standard = ref;
            }}
            height={130}>
            <View style={styles.bottomSheetContainer}>
              <TouchableHighlight
                key={list.icon}
                onPress={() => this.Standard.close()}>
                <View style={styles.bottomSheetAction}>
                  <FontAwesomeIcon icon={faUserAlt} size={30} color="#707070" />

                  <Text style={styles.bottomSheetText}>
                    Facture personnelle
                  </Text>
                 
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                key={list.icon}
                onPress={() => this.Standard.close()}>
                <View style={styles.bottomSheetAction}>
                  <FontAwesomeIcon icon={faUserAlt} size={30} color="#707070" />

                  <Text style={styles.bottomSheetText}>
                    Facture personnelle
                  </Text>
                 
                </View>
              </TouchableHighlight>
              
            </View>
        
          </RBSheet>
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
      </>
    );
  }
}

export default BankStatementScreen;
