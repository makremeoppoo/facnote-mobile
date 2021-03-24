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
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-community/async-storage';

import {
  faUserAlt,
  faEllipsisH,
  faExclamationCircle,
  faLink,
  faComments,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

import getBankStatement from '../../services/bankStatement';
import getAccountsBank from '../../services/accountsBank';
import getComments from '../../services/getComments';
import sendComment from '../../services/sendComment';
import replyComment from '../../services/replyComment';
import getExercices from '../../services/getExercices';

import RBSheet from '../../components/RBSheet/RBSheet';

import DatePicker from '../../components/DatePicker/DatePicker';
import TextAreaInput from '../../components/TextAreaInput/TextInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import BankCard from '../../components/CardView/BankCard';
import CommentCard from '../../components/CardView/CommentCard';
import PageLoader from '../../components/PageLoader/PageLoader';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import SecondButton from '../../components/SecondButton/SecondButton';
import Close from '../../../assets/icons/closeGrey.png';
import {text} from '../../constants';
import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';

import styles from './styles';
import {routes} from '../../constants';
class BankStatementScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalIsFilter: true,
      modalIsListComments: false,
      comments: [],
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
      showPdfModal: false,
      statement: {},
      menus: [],
      nbr_transactions_a_justifier: 0,
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

  onOpenModal = () => {
    this.setState({
      showModal: true,
    });
  };
  onCloseModal = () => {
    this.setState({
      showModal: false,
      comment: '',
    });
  };

  showActionSheet = (item, menus) => {
    this.setState({
      bankId: item.id,
      menus,
      modalIsFilter: false,
      modalIsListComments: false,
    });
    this.Standard.open();
  };

  onScroll = () => {
    this.setState({hasScrolled: true});
  };

  getComments = async (item) => {
    try {
      var data = await getComments(10, 1, item.id);
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        comments: data.comments,
        showModal: true,
        modalIsListComments: true,
      });
    }
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
      this.setState({
        list,
        nbr_transactions_a_justifier: statements.nbr_transactions_a_justifier,

        exercices,
        isRefreshing: false,
      });
    }
  };
  openSendCommentModal = async (billType) => {
    await this.setState(
      {
        billType,
      },
      () => {
        this.onOpenModal();
      },
    );
    await this.Standard.close();
    await this.Standard.open();
  };

  sendComment = async () => {
    const {comment, bankId, billType} = this.state;

    try {
      if (billType == 'expert') replyComment(comment, bankId, billType);
      else await sendComment(comment, bankId, billType);
    } catch (e) {
      console.log(e);
    } finally {
      Toast.show({
        text1: 'Felicitation',
        text2: 'Votre message a été envoyé',
        type: 'success',
      });
      this.onCloseModal();
      this.handleRefresh();
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
    var exercices = await getExercices();
    var accounts = await getAccountsBank(100, 1);
    let bankAccounts = [];
    accounts.map((item, index) => {
      bankAccounts.push({
        key: index++,
        value: item.iban,
        label: item.banque,
      });
    });
    this.setState({
      bankAccounts,
      account: bankAccounts[0],
      startDate: exercices.current_exercise.date_debut,
      endDate: exercices.current_exercise.date_fin,
    });
    this.loadData();
  }
  renderComment = ({item}) => <CommentCard item={item} />;

  renderItem = ({item}) => (
    <View>
      <BankCard
        key={item.counter}
        onCardPress={() => {
          if (
            item.associer == null &&
            item.justificatif &&
            item.facture_tag == null
          ) {
            const menus = [
              {
                label: 'Joindre une facture',
                icon: faLink,
                onPress: () => {
                  this.props.navigation.navigate(routes.Invoices)
                  AsyncStorage.setItem('from', routes.BankStatement);
                }
                  ,
              },
              {
                label: 'Facture personnelle',
                icon: faUserAlt,
                onPress: () => this.openSendCommentModal('personnelle'),
              },
              {
                label: 'Facture perdue',
                icon: faExclamationCircle,
                onPress: () => this.openSendCommentModal('perdue'),
              },

              {
                label: 'Autres',
                icon: faEllipsisH,
                onPress: () => this.openSendCommentModal('autres'),
              },
            ];
            this.showActionSheet(item, menus);
            return;
          }
          if (
            item.associer == null &&
            item.etat_commentaire == 3 &&
            item.facture_tag !== null
          ) {
            const menus = [
              {
                label: 'Joindre une facture',
                icon: faLink,
                onPress: () => this.props.navigation.navigate(routes.Invoices),
              },
              {
                label: 'Répondre à l’expert',
                icon: faComments,
                onPress: () => this.openSendCommentModal('expert'),
              },
            ];
            this.showActionSheet(item, menus);
            return;
          }

          if (
            item.associer == null &&
            (item.etat_commentaire == 4 || item.etat_commentaire == 5) &&
            item.facture_tag !== null
          ) {
            const menus = [
              {
                label: 'Joindre une facture',
                icon: faLink,
                onPress: () => this.props.navigation.navigate(routes.Invoices),
              },
              {
                label: 'Voir commentaire',
                icon: faComment,
                onPress: () => {
                  this.getComments(item);
                },
              },
            ];
            this.showActionSheet(item, menus);
            return;
          }
        }}
        item={item}
      />
    </View>
  );
  getData = () => {
    if (this.state.justificatif) return this.state.list;
    else
      return this.state.list.filter(
        (item) => (!item.associer && item.justificatif) || item.isTitle,
      );
  };
  renderFilter = () => (
    <View style={styles.modalContant}>
      {/* <TextInput
        style={styles.input}
        label={text.searchReleveBanquaire}
        value={this.state.multipleSearch}
        onChangeText={(text, name) => this.setField(text, 'search_multiple')}
        name="search_multiple"
        type="text"
     />*/}
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
      {/* <View style={{flexDirection: 'row'}}>
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


    */}
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
      {/*<SelectInput
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
      />*/}
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
              this.onCloseModal();
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
    const {
      list,
      isRefreshing,
      account,
      nbr_transactions_a_justifier,
    } = this.state;

    return (
      <>
        <Toast ref={(ref) => Toast.setRef(ref)} style={{elevation: 11}} />

        <NavigationHeader
          onPress={() => {
            //  this.Standard.open();
            this.props.navigation.goBack();
          }}
          title={text.banque}
          subTitle={account.label}
          onPressTwo={() =>
            this.setState({
              showModal: !this.state.showModal,
              modalIsFilter: true,
            })
          }
        />
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={[
                styles.soldeTitle,
                list[1]?.solde < 0 ? {color: 'red'} : {color: '#15CA20'},
              ]}>
              {list.length > 0 ? list[1]?.solde : 0} €
            </Text>
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
                {nbr_transactions_a_justifier + ' ' + text.transactionJustifier}
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
            keyExtractor={(item) => item.counter.toString()}
            initialNumToRender={3}
            refreshing={false}
            onRefresh={() => this.handleRefresh()}
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
                {this.state.modalIsFilter ? (
                  <View style={styles.modalContainer}>
                    <ScrollView>{this.renderFilter()}</ScrollView>
                  </View>
                ) : this.state.modalIsListComments ? (
                  <View style={styles.modalContainer}>
                    <ScrollView>
                      <FlatList
                        ItemSeparatorComponent={() => {
                          return (
                            <View
                              style={{
                                height: 0.5,
                                backgroundColor: '#707070',
                              }}
                            />
                          );
                        }}
                        style={styles.flatListStyle}
                        data={this.state.comments}
                        renderItem={this.renderComment}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={3}
                        refreshing={false}
                        onEndThreshold={0}
                      />
                    </ScrollView>
                  </View>
                ) : (
                  <View style={styles.modalContainer}>
                    <View style={styles.titleModalContainer}>
                      <Text style={styles.titleModalText}>
                        {this.state.billType == 'personnelle' &&
                          'Facture personnelle'}
                        {this.state.billType == 'autres' && 'Autres'}
                        {this.state.billType == 'perdue' && 'Facture perdue'}
                        {this.state.billType == 'expert' &&
                          'Répondre à l’expert'}
                      </Text>
                    </View>
                    <ScrollView>{this.renderActionForm()}</ScrollView>
                  </View>
                )}
              </View>
            </View>
          </Modal>

          <RBSheet
            ref={(ref) => {
              this.Standard = ref;
            }}
            menus={this.state.menus}
          />
        </View>
      </>
    );
  }
}

export default BankStatementScreen;
