/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';

import Rectangle from '../../../assets/images/Rectangle.png';
import DatePicker from '../../components/DatePicker/DatePicker';
import styles from './styles';
import saveIndemnite from '../../services/indemnite';
import moment from 'moment';

class IndemnitesScreen extends React.Component {
  state = {
    puissance: '',
    date: moment(new Date()).format('YYYY-MM-DD'),
    distance: '',
    lieuDapart: '',
    lieuArriver: '',
    motif: '',
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
    const {user} = this.props.user;

    try {
       this.setState({loading: true});
      const data = {
        base: user.base,
        date,
        userActiveInput: '',
        puissanceAdministrative: puissance,
        distanceParcourue: distance,
        lieuDepart: lieuDapart,
        lieuArrivee: lieuArriver,
        clientOuMotif: motif,
        user: {id: user.id},
      };
      var res = await saveIndemnite(data);
     
      this.props.closeModal({
        text1: 'Felicitation',
        text2: 'Vos factures ont bien été transmises',
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
    return (
      <View style={styles.container}>

        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Indemnités Kilométriques</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Date</Text>

              <DatePicker
                date={this.state.date}
                setCurrentDate={this.setDate}
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Puissance Administrative</Text>

              <View style={styles.inputContainer}>
                <Picker
                  placeholder="select Puissance"
                  selectedValue={this.state.puissance}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({puissance: itemValue})
                  }>
                  <Picker.Item label="" value=""></Picker.Item>

                  <Picker.Item label="Moto P = 50 CC" value="1"></Picker.Item>
                  <Picker.Item label="Moto P = 3CV" value="2"></Picker.Item>
                  <Picker.Item label="Moto P = 6CV" value="3"></Picker.Item>
                  <Picker.Item label="Moto P = 5CV" value="4"></Picker.Item>
                  <Picker.Item
                    label="Automobile P = 3CV"
                    value="5"></Picker.Item>
                  <Picker.Item
                    label="Automobile P = 4CV"
                    value="6"></Picker.Item>
                  <Picker.Item
                    label="Automobile P = 5CV"
                    value="7"></Picker.Item>
                  <Picker.Item
                    label="Automobile P = 6CV"
                    value="8"></Picker.Item>
                  <Picker.Item
                    label="Automobile P = 6CV"
                    value="9"></Picker.Item>
                </Picker>
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Distance parcourue(KM)</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(text, name) => this.setField(text, 'distance')}
                  name="distance"
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Lieu de départ</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(text, name) =>
                    this.setField(text, 'lieuDapart')
                  }
                  name="lieuDapart"
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Lieu d'arrivée</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(text, name) =>
                    this.setField(text, 'lieuArriver')
                  }
                  name="lieuArriver"
                />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Client ou motif</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={(text, name) => this.setField(text, 'motif')}
                  name="motif"
                />
              </View>
            </View>
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
export default connect(mapStateToProps)(IndemnitesScreen);
