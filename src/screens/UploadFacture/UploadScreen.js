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
import ImagePicker from 'react-native-image-picker';
import Achat from '../../../assets/images/Achats.png';
import AvanceDeFrais from '../../../assets/images/AvanceDeFrais.png';
import Document from '../../../assets/images/Document.png';
import Indemnite from '../../../assets/images/Indemnite.png';
import Background from '../../../assets/images/backgroung_depose_facture.png';
import Rectangle from '../../../assets/images/Rectangle.png';
import Close from '../../../assets/icons/close.png';
import iconePrendrePhoto from '../../../assets/icons/icone_prendre_photo.png';
import iconeGestionnairePhoto from '../../../assets/icons/icone_gestionnaire_photo.png';

import styles from './styles';


export default class ExpensesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      showModal: false,
    };
    this.actionSheet = createRef();
  }

  setTypeFacture = (typeFacture) => {
    this.setState({typeFacture});
    this.setState({showModal: !this.state.showModal});
    //this.actionSheet.current.show();
  };

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  /* renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image
          source={require('../../../assets/icons/backArrow.png')}        />
      );
    }
  }*/

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} />;
    } else {
      return null;
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.containerStyle}>
          <ImageBackground
            source={Background}
            style={styles.backgroundStyle}></ImageBackground>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nom de la Société</Text>
          </View>
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={() => this.setTypeFacture(1)}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Image style={styles.Img} source={Achat} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={() => this.props.navigation.navigate('Indemnites')}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Image style={styles.Img} source={Indemnite} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={() => this.setTypeFacture(1)}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Image style={styles.Img} source={Document} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={() => this.setTypeFacture(1)}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Image style={styles.Img} source={AvanceDeFrais} />
          </TouchableHighlight>
        
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ImageBackground
                  source={Rectangle}
                  style={styles.backgroundStyle}></ImageBackground>
                <TouchableHighlight
                  style={styles.modalCloseView}
                  onPress={() =>
                    this.setState({showModal: !this.state.showModal})
                  }
                  underlayColor="rgba(73,182,77,1,0.9)">
                  <Image style={styles.closeImg} source={Close} />
                </TouchableHighlight>
                <View  style={styles.buttomIcon}>
                  <TouchableHighlight
                    onPress={() => this.chooseImage()}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <Image
                      style={styles.iconGestion}
                      source={iconeGestionnairePhoto}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => this.launchCamera()}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <Image
                      style={styles.iconGestion}
                      source={iconePrendrePhoto}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}
