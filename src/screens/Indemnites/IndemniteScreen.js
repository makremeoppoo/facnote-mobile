/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Linking,
  TextInput,
  Image,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

import Rectangle from '../../../assets/images/Rectangle.png';
import DatePicker from '../../components/DatePicker/DatePicker';
import styles from './styles';

class IndemnitesScreen extends React.Component {
  state = {
    puissance: '',
  };
  constructor(props) {
    super(props);
  }

  setDate = (date) => {
    console.log(date);
  };
  setField = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };
  callNumber = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  sendMail = (email) => {
    Linking.openURL(`mailto:${email}?subject=Cabinet`);
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Indemnités Kilométriques</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Date</Text>

              <DatePicker setDate={this.setDate} />
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
                <TextInput setDate={this.setField} name="distance" />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Lieu de départ</Text>

              <View style={styles.inputContainer}>
                <TextInput setDate={this.setField} name="lieuDapart" />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Lieu d'arrivée</Text>

              <View style={styles.inputContainer}>
                <TextInput setDate={this.setField} name="lieuArriver" />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Client ou motif</Text>

              <View style={styles.inputContainer}>
                <TextInput setDate={this.setField} name="motif" />
              </View>
            </View>
          </View>
          <View style={styles.ButtonsContain}>
            <TouchableHighlight style={styles.btnContainer}>
              <Text style={styles.btnTxt}>Annuler</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btnSubmitContainer}>
              <>
                <Image style={styles.rectangle} source={Rectangle} />
                <Text style={styles.submitTxt}>Valider</Text>
              </>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default IndemnitesScreen;
