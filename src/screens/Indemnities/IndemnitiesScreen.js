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

import Rectangle from '../../../assets/images/Rectangle.png';
import DatePicker from '../../components/DatePicker/DatePicker';
import TextInput from '../../components/TextInput/TextInput';
import SelectInput from '../../components/SelectInput/SelectInput';

import styles from './styles';
import saveIndemnite from '../../services/indemnite';
import moment from 'moment';

class IndemnitiesScreen extends React.Component {
  state = {
    puissance: '1',
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
        text1: 'Felicitation',
        text2: 'Les données ont été enregistrées avec succès',
        type: 'success',
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      this.props.closeModal({
        text1: 'Échec',
        text2: 'enregistrement interrompu',
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
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Indemnités Kilométriques</Text>
          </View>
          <View style={styles.infoContainer}>
            <DatePicker
              date={this.state.date}
              setCurrentDate={this.setDate}
              label={'Date'}
              style={styles.input}
            />

            <SelectInput
              label={'Puissance Administrative'}
              selectedValue={this.state.puissance.label}
              onChange={(option) => {
                console.log(option)
                this.setState({puissance: option});
              }}
              listItems={[
                {label: 'Moto P < 50 CC', value: '1'},
                {label: 'Moto P < 3CV', value: '2'},
                {label: 'Moto P < 6CV', value: '3'},
                {label: 'Moto P > 5CV', value: '4'},
                {label: 'Automobile P <  3CV', value: '5'},
                {label: 'Automobile P = 4CV', value: '6'},
                {label: 'Automobile P = 5CV', value: '7'},
                {label: 'Automobile P = 6CV', value: '8'},
                {label: 'Automobile P > 6CV', value: '9'},
              ]}
            />

            <TextInput
              style={styles.input}
              label={'Distance parcourue(KM)'}
              onChangeText={(text, name) => this.setField(text, 'distance')}
              name="distance"
              type="number"
              keyboardType="numeric"
              errorLabel={distanceError && 'Champ obligatoire'}
            />

            <TextInput
              style={styles.input}
              label={'Lieu de départ'}
              onChangeText={(text, name) => this.setField(text, 'lieuDapart')}
              name="lieuDapart"
              errorLabel={lieuDapartError && 'Champ obligatoire'}
            />

            <TextInput
              style={styles.input}
              label={"Lieu d'arrivée"}
              onChangeText={(text, name) => this.setField(text, 'lieuArriver')}
              name="lieuArriver"
              errorLabel={lieuArriverError && 'Champ obligatoire'}
            />
            <TextInput
              style={styles.input}
              label={'Client ou motif'}
              onChangeText={(text, name) => this.setField(text, 'motif')}
              name="motif"
              errorLabel={motifError && 'Champ obligatoire'}
            />
          </View>
          <View style={styles.ButtonsContain}>
            <TouchableHighlight
              style={styles.btnContainer}
              onPress={() => this.props.closeModal(null)}>
              <Text style={styles.btnTxt}>Annuler</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnSubmitContainer}
              onPress={() => this.sendIndemnite()}>
              <>
                <Image style={styles.rectangle} source={Rectangle} />
                <Text style={styles.submitTxt}>
                  {' '}
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    'Valider'
                  )}
                </Text>
              </>
            </TouchableHighlight>
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
