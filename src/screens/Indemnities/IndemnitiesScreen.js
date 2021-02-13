/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import DatePicker from '../../components/DatePicker/DatePicker';
import TextInput from '../../components/TextInput/TextInput';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import SecondButton from '../../components/SecondButton/SecondButton';
import SelectInput from '../../components/SelectInput/SelectInput';

import styles from './styles';
import saveIndemnite from '../../services/indemnite';
import moment from 'moment';
import {text} from '../../constants';

class IndemnitiesScreen extends React.Component {
  state = {
    puissance: '',
    puissanceError: false,
    date: moment(new Date()).format('YYYY-MM-DD'),
    distance: '',
    distanceError: false,
    lieuDapart: '',
    lieuDapartError: false,
    lieuArriver: '',
    lieuArriverError: false,
    motif: '',
    motifError: false,
    loading: false,
  };
  constructor(props) {
    super(props);
  }

  setDate = (date) => {
    this.setState({date});
  };
  setField = (text, name) => {
    this.setState({[name]: text});
  };

  sendIndemnite = async () => {
    const {
      puissance,
      date,
      distance,
      lieuArriver,
      lieuDapart,
      motif,
    } = this.state;
    console.log(this.state);
    const {user} = this.props.user;
    await this.setState({
      distanceError: distance == '',
      lieuArriverError: lieuArriver == '',
      lieuDapartError: lieuDapart == '',
      motifError: motif == '',
      puissanceError: puissance == '',
    });

    if (
      this.state.distanceError ||
      this.state.lieuArriverError ||
      this.state.lieuDapartError ||
      this.state.motifError
    )
      return;
    try {
      this.setState({loading: true});
      const data = {
        base: user.base,
        date,
        userActiveInput: '',
        puissanceAdministrative: puissance.value,
        distanceParcourue: distance,
        lieuDepart: lieuDapart,
        lieuArrivee: lieuArriver,
        clientOuMotif: motif,
        user: {id: user.id},
      };

      var res = await saveIndemnite(data);

      this.props.closeModal({
        text1: text.Felicitation,
        text2: text.indemniteSuccess,
        type: 'success',
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      this.props.closeModal({
        text1: text.Echec,
        text2: text.telechargementError,
        type: 'error',
      });
    }
  };

  render() {
    const {
      distanceError,
      motifError,
      lieuDapartError,
      lieuArriverError,
      puissanceError,
    } = this.state;
    let index = 0;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{text.IndemnitesTitle}</Text>
          </View>
          <View style={styles.infoContainer}>
            <DatePicker
              initialDate={new Date()}
              setCurrentDate={this.setDate}
              label={text.Date}
              style={styles.input}
            />

            <SelectInput
              label={text.PuissanceAdministrative}
              selectedValue={this.state.puissance.label}
              onChange={(option) => {
                console.log(option);
                this.setState({puissance: option});
              }}
              errorLabel={puissanceError && text.Champobligatoire}
              listItems={[
                {key: index++, label: 'Moto P < 50 CC', value: '1'},
                {key: index++, label: 'Moto P < 3CV', value: '2'},
                {key: index++, label: 'Moto P < 6CV', value: '3'},
                {key: index++, label: 'Moto P > 5CV', value: '4'},
                {key: index++, label: 'Automobile P <  3CV', value: '5'},
                {key: index++, label: 'Automobile P = 4CV', value: '6'},
                {key: index++, label: 'Automobile P = 5CV', value: '7'},
                {key: index++, label: 'Automobile P = 6CV', value: '8'},
                {key: index++, label: 'Automobile P > 6CV', value: '9'},
              ]}
            />

            <TextInput
              style={styles.input}
              label={text.DistanceParcourue}
              onChangeText={(text, name) => this.setField(text, 'distance')}
              name="distance"
              type="number"
              keyboardType="numeric"
              errorLabel={distanceError && text.Champobligatoire}
            />

            <TextInput
              style={styles.input}
              label={text.LieuDepart}
              onChangeText={(text, name) => this.setField(text, 'lieuDapart')}
              name="lieuDapart"
              errorLabel={lieuDapartError && text.Champobligatoire}
            />

            <TextInput
              style={styles.input}
              label={text.LieuArrive}
              onChangeText={(text, name) => this.setField(text, 'lieuArriver')}
              name="lieuArriver"
              errorLabel={lieuArriverError && text.Champobligatoire}
            />
            <TextInput
              style={styles.input}
              label={text.ClientMotif}
              onChangeText={(text, name) => this.setField(text, 'motif')}
              name="motif"
              errorLabel={motifError && text.Champobligatoire}
            />
            <View style={styles.ButtonsContain}>
              <SecondButton
                label={text.Annuler}
                loading={this.state.loading}
                onPress={() => this.props.closeModal(null)}
              />
              <SubmitButton
                loading={this.state.loading}
                label={text.Valider}
                onPress={() => this.sendIndemnite()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(IndemnitiesScreen);
