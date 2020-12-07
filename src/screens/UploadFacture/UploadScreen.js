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
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Icon as IconView} from 'react-native-elements';
import ImageResizer from 'react-native-image-resizer';

import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';

import Achat from '../../../assets/images/Achats.png';
import AvanceDeFrais from '../../../assets/images/AvanceDeFrais.png';
import Document from '../../../assets/images/Document.png';
import Indemnite from '../../../assets/images/Indemnite.png';
import Background from '../../../assets/images/backgroung_depose_facture.png';
import Rectangle from '../../../assets/images/Rectangle.png';
import Close from '../../../assets/icons/close.png';
import * as api from '../../services/auth';

import styles from './styles';

 class UploadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multiFiles: [],
      showModal: false,
      loading: false,
      resizeTargetSize: 80,
      mode: 'contain',
      onlyScaleDown: false,
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

      var res = await api.uploadFiles(typeFacture, multiFiles);
      this.setState({
        loading: false,
        showModal: false,
        multiFiles: [],
      });
      Toast.show({
        text1: 'Felicitation',
        text2: 'fichier (s) téléchargé avec succès! 👋',
        type: 'success',
      });
    } catch (error) {
      this.setState({
        loading: false,
        showModal: false,
        multiFiles: [],
      });
      Toast.show({
        text1: 'Échec',
        text2: 'telechargement fichier interrompu',
        type: 'error',
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
        ImageResizer.createResizedImage(
          res.uri,
          this.state.resizeTargetSize,
          this.state.resizeTargetSize,
          'JPEG',
          100,
          0,
          undefined,
          false,
          {mode: this.state.mode, onlyScaleDown: this.state.onlyScaleDown},
        )
          .then((resizedImage) => {
            let obj = {
              name: res.name,
              type: res.type,
              uri: resizedImage.uri,
            };

            copy.push(obj);
            this.setState({multiFiles: copy});
          })
          .catch((err) => {
            console.log(err);
          });
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

        ImageResizer.createResizedImage(
          response.uri,
          this.state.resizeTargetSize,
          this.state.resizeTargetSize,
          'JPEG',
          100,
          0,
          undefined,
          false,
          {mode: this.state.mode, onlyScaleDown: this.state.onlyScaleDown},
        )
          .then((resizedImage) => {
            let obj = {
              name: response.fileName,
              type: response.type,
              uri: resizedImage.uri,
            };
            copy.push(obj);
            this.setState({multiFiles: copy});
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  renderFileUri() {
    console.log('this.state.multiFiles', this.state.multiFiles);
    return (
      <ScrollView>
        <View style={styles.photoContainer}>
          {this.state.multiFiles.map((item, key) => (
            <View key={key} style={styles.viewImg}>
              {item.uri ? (
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
    const {cabinet} = this.props.user;

    return (
      <ScrollView>
        <View style={styles.containerStyle}>
          <ImageBackground
            source={Background}
            style={styles.backgroundStyle}></ImageBackground>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{cabinet.cabinet.raison_sociale}</Text>
          </View>
          <Toast ref={(ref) => Toast.setRef(ref)} />

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
                onPress={() => this.props.navigation.navigate('Indemnites')}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image style={styles.Img} source={Indemnite} />
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
                    })
                  }
                  underlayColor="rgba(73,182,77,1,0.9)">
                  <Image style={styles.closeImg} source={Close} />
                </TouchableHighlight>
                {this.state.multiFiles.length > 0 && (
                  <TouchableHighlight
                    onPress={() => this.sendDocs()}
                    style={styles.SendView}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <View style={styles.SendIconView}>
                      <Text style={{...styles.btnTxt}}>envoyer</Text>
                    </View>
                  </TouchableHighlight>
                )}

                <View style={styles.buttomIcon}>
                  <TouchableHighlight
                    onPress={() => this.chooseImage()}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <IconView
                      iconStyle={{color: 'rgba(92,117,254,0.8)'}}
                      reverse
                      name="ios-images-outline"
                      type="ionicon"
                      color="white"
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => this.launchCamera()}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <IconView
                      iconStyle={{color: 'rgba(92,117,254,0.8)'}}
                      reverse
                      name="ios-camera-sharp"
                      type="ionicon"
                      color="white"
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
const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(UploadScreen);