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
  ActivityIndicator,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import Achat from '../../../assets/images/Achats.png';
import AvanceDeFrais from '../../../assets/images/AvanceDeFrais.png';
import Document from '../../../assets/images/Document.png';
import Indemnite from '../../../assets/images/Indemnite.png';

import Background from '../../../assets/images/backgroung_depose_facture.png';
import Rectangle from '../../../assets/images/Rectangle.png';
import Close from '../../../assets/icons/close.png';
import iconePrendrePhoto from '../../../assets/icons/icone_prendre_photo.png';
import iconeGestionnairePhoto from '../../../assets/icons/icone_gestionnaire_photo.png';
import * as api from '../../services/auth';

import styles from './styles';

export default class ExpensesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multiFiles: [],
      showModal: false,
      message: {type: '', text: ''},
      loading: false,
    };
    this.actionSheet = createRef();
  }

  setTypeFacture = (typeFacture) => {
    this.setState({typeFacture: typeFacture, showModal: !this.state.showModal});
    //this.actionSheet.current.show();
  };
  sendDocs = async () => {
    const {typeFacture, multiFiles} = this.state;

    try {
      await this.setState({loading: true});
      console.log("multiFiles",multiFiles)

      var res = await api.uploadFiles(typeFacture, multiFiles);
       this.setState({
        loading: false,
        message: {type: 'success', text: 'fichier (s) téléchargé avec succès!'},
      });
    } catch (error) {
       this.setState({
        loading: false,

        message: {type: 'error', text: 'telechargement fichier interrompu'},
      });
    }
  };
  chooseImage = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      let copy = [...this.state.multiFiles];

      for (const res of results) {
        copy.push(res);
        //Printing the log realted to the file
      }
      //Setting the state to show multiple file attributes

      this.setState({multiFiles: copy});
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let copy = [...this.state.multiFiles];
        let obj = {
          name: response.fileName,
          size: response.fileSize,
          type: response.type,
          uri: response.uri,
        };
        copy.push(obj);

        this.setState({multiFiles: copy});
        /**
         * 
         * this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
         */
      }
    });
  };

  renderFileUri() {
    return (
      <ScrollView>
        <View style={styles.photoContainer}>
          {this.state.multiFiles.map((item, key) => (
            <View key={key} style={styles.viewImg}>
              {item.type == 'image/jpeg' ? (
                <Image style={styles.ImgPlus} source={{uri: item.uri}} />
              ) : (
                <Icon
                  style={{
                    height: '90%',
                    width: '90%',
                    backgroundColor: 'white',
                    textAlign: 'center',
                    paddingTop: '30%',
                    margin: '3%',
                    borderRadius: 10,
                  }}
                  name={'ios-document-attach-sharp'}
                  size={32}
                  color={'rgb(92,117,254)'}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    );
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
          <View style={styles.buttonContainer}>
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
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ImageBackground
                  source={Rectangle}
                  style={styles.backgroundModalStyle}></ImageBackground>
                {this.renderFileUri()}
                {this.state.loading && (
                  <ActivityIndicator
                    size="large"
                    color="white"
                    style={{position: 'absolute', marginTop: '50%'}}
                  />
                )}
                <TouchableHighlight
                  style={styles.modalCloseView}
                  onPress={() =>
                    this.setState({
                      showModal: !this.state.showModal,

                      multiFiles: [],
                      message: {type: '', text: ''},
                    })
                  }
                  underlayColor="rgba(73,182,77,1,0.9)">
                  <Image style={styles.closeImg} source={Close} />
                </TouchableHighlight>
                <View style={styles.buttomIcon}>
                  <Text
                    style={
                      this.state.message.type == 'error'
                        ? styles.error
                        : styles.success
                    }>
                    {this.state.message.text}
                  </Text>
                  <TouchableHighlight
                    onPress={() => this.chooseImage()}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <Image
                      style={styles.iconGestion}
                      source={iconeGestionnairePhoto}
                    />
                  </TouchableHighlight>
                  {this.state.multiFiles.length > 0 && (
                    <TouchableHighlight
                      onPress={() => this.sendDocs()}
                      underlayColor="rgba(73,182,77,1,0.9)">
                      <View style={styles.SendIconView}>
                        <Icon
                          style={styles.SendIcon}
                          name={'ios-send-sharp'}
                          size={32}
                          color={'rgb(92,117,254)'}
                        />
                      </View>
                    </TouchableHighlight>
                  )}
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
