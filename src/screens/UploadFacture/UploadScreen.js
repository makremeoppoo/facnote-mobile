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

import Achat from '../../../assets/images/Achats.png';
import AvanceDeFrais from '../../../assets/images/AvanceDeFrais.png';
import Document from '../../../assets/images/Document.png';
import Indemnite from '../../../assets/images/Indemnite.png';
import Background from '../../../assets/images/backgroung_depose_facture.png';
import AddFactureScreen from './addFacture';
import IndemniteScreen from '../Indemnites/IndemniteScreen';

import styles from './styles';

class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      typeFacture: '0',
    };
  }

  setTypeFacture = (typeFacture) => {
    this.setState({typeFacture: typeFacture, showModal: !this.state.showModal});
  };
  closeModal = (obj) => {
    if (obj != null) Toast.show(obj);
    this.setState({showModal: !this.state.showModal});
  };

  render() {
    const {cabinet} = this.props.user;

    return (
      <View style={styles.containerStyle}>
        <ImageBackground
          source={Background}
          style={styles.backgroundStyle}></ImageBackground>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{cabinet.cabinet.raison_sociale}</Text>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} style={{elevation: 11}} />

        <ScrollView style={styles.scrollView}>
          <View style={styles.buttonContainer}>
            <View style={styles.btnView}>
              <TouchableHighlight
                style={styles.btnContainer}
                onPress={() => this.setTypeFacture(1)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.Img} source={Achat} />
              </TouchableHighlight>
            </View>
            <View style={styles.btnView}>
              <TouchableHighlight
                style={styles.btnContainer}
                onPress={() => this.setTypeFacture(3)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.Img} source={AvanceDeFrais} />
              </TouchableHighlight>
            </View>
            <View style={styles.btnView}>
              <TouchableHighlight
                style={styles.btnContainer}
                onPress={() => this.setTypeFacture(4)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.Img} source={Document} />
              </TouchableHighlight>
            </View>
            <View style={styles.btnView}>
              <TouchableHighlight
                style={styles.btnContainer}
                onPress={() => this.setTypeFacture(0)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.Img} source={Indemnite} />
              </TouchableHighlight>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}>
            {this.state.typeFacture == 0 ? (
              <IndemniteScreen closeModal={this.closeModal} />
            ) : (
              <AddFactureScreen closeModal={this.closeModal} />
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
