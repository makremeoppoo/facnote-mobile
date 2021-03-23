/*This is an example of File Picker in React Native*/
import React, {createRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';

import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import Achat from '../../../assets/images/Achats.png';
import AvanceDeFrais from '../../../assets/images/AvanceDeFrais.png';
import Document from '../../../assets/images/Document.png';
import Indemnity from '../../../assets/images/Indemnity.png';
import Background from '../../../assets/images/backgroung_depose_facture.png';
import ChooseFacture from './UploadInvoice';
import IndemnitiesScreen from '../Indemnities/IndemnitiesScreen';
import {routes, permissions} from '../../constants';
import {userHasPermission} from '../../functions/userHasPermission';

import styles from './styles';

class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      typeFacture: '0',
      canSalesOrPurchase: false,
    };
  }

  async componentDidMount() {
    var canSalesOrPurchase =
      (await userHasPermission(permissions.sales)) ||
      (await userHasPermission(permissions.purchases));
    this.setState({canSalesOrPurchase});
  }
  setInvoiceType = (typeFacture) => {
    this.setState({typeFacture: typeFacture, showModal: !this.state.showModal});
  };
  closeModal = async (obj) => {
    if (obj != null) await Toast.show(obj);
    await this.setState({showModal: !this.state.showModal});
    const from = await AsyncStorage.getItem('from');
    if (from == routes.BankStatement) {
      await AsyncStorage.removeItem('from');
      this.props.navigation.navigate(routes.BankStatement);
    }
  };

  render() {
    const {society} = this.props.user;
    const {canSalesOrPurchase} = this.state;
    console.log(canSalesOrPurchase);
    return (
      <View style={styles.containerStyle}>
        <Image source={Background} style={styles.backgroundStyle}></Image>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{society.cabinet.raison_sociale}</Text>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} style={{elevation: 11}} />

        <ScrollView style={styles.scrollView}>
          <View style={styles.buttonContainer}>
            {canSalesOrPurchase && (
              <>
                <View style={styles.btnView}>
                  <TouchableHighlight
                    style={styles.btnContainer}
                    onPress={() => this.setInvoiceType(1)}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <Image style={styles.Img} source={Achat} />
                  </TouchableHighlight>
                </View>
                <View style={styles.btnView}>
                  <TouchableHighlight
                    style={styles.btnContainer}
                    onPress={() => this.setInvoiceType(3)}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <Image style={styles.Img} source={AvanceDeFrais} />
                  </TouchableHighlight>
                </View>
              </>
            )}
            <View style={styles.btnView}>
              <TouchableHighlight
                style={styles.btnContainer}
                onPress={() => this.setInvoiceType(4)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.Img} source={Document} />
              </TouchableHighlight>
            </View>
            <View style={styles.btnView}>
              <TouchableHighlight
                style={styles.btnContainer}
                onPress={() => this.setInvoiceType(0)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.Img} source={Indemnity} />
              </TouchableHighlight>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}>
            {this.state.typeFacture == 0 ? (
              <IndemnitiesScreen closeModal={this.closeModal} />
            ) : (
              <ChooseFacture
                typeFacture={this.state.typeFacture}
                closeModal={this.closeModal}
              />
            )}
          </Modal>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(UploadScreen);
