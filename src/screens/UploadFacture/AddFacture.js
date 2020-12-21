/*This is an example of File Picker in React Native*/
import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Icon as IconView} from 'react-native-elements';
import ImageResizer from 'react-native-image-resizer';

import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Rectangle from '../../../assets/images/Rectangle.png';
import Close from '../../../assets/icons/close.png';
import uploadFiles from '../../services/upload';

import styles from './styles';

class LoginactureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multiFiles: [],
      loading: false,
      resizeTargetWidthSize: 590,
      resizeTargetHightSize: 600,

      mode: 'contain',
      onlyScaleDown: false,
    };
  }
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
          this.state.resizeTargetWidthSize,
          this.state.resizeTargetHightSize,
          'JPEG',
          60,
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
          this.state.resizeTargetWidthSize,
          this.state.resizeTargetHightSize,
          'JPEG',
          60,
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
  removeFile = async (index) => {
    this.setState({loading: true});
    const multiFiles = this.state.multiFiles.filter(
      (item, key) => key != index,
    );
    await this.setState({multiFiles});
    this.setState({loading: false});
  };

  renderFileUri() {
    console.log('this.state.multiFiles', this.state.multiFiles);
    return (
      <ScrollView>
        <View style={styles.photosContainer}>
          {this.state.multiFiles.map((item, key) => (
            <View>
              <TouchableHighlight
                style={styles.removeFile}
                onPress={() => this.removeFile(key)}>
                <Icon
                  iconStyle={styles.iconRemoveFile}
                  reverse
                  type="ionicon"
                  color="white"
                  name={'ios-close-circle-sharp'}
                  size={25}
                />
              </TouchableHighlight>
              {item.uri ? (
                <View key={key} style={styles.viewImg}>
                  <Image style={styles.imgFacture} source={{uri: item.uri}} />
                </View>
              ) : (
                <View key={key} style={styles.viewImg}>
                  <Icon
                    style={styles.iconFile}
                    name={'ios-document-attach-sharp'}
                    size={32}
                    color={'rgb(92,117,254)'}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
  sendDocs = async () => {
    const {typeFacture, multiFiles} = this.state;

    try {
      await this.setState({loading: true});

      var res = await uploadFiles(this.props.typeFacture, multiFiles);
      this.setState({
        loading: false,
        multiFiles: [],
      });
      this.props.closeModal({
        text1: 'Felicitation',
        text2: 'Vos factures ont bien été transmises',
        type: 'success',
      });
    } catch (error) {
      this.setState({
        loading: false,
        multiFiles: [],
      });
      this.props.closeModal({
        text1: 'Échec',
        text2: 'telechargement fichier interrompu',
        type: 'error',
      });
    }
  };

  render() {
    return (
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
            onPress={() => this.props.closeModal(null)}
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
    );
  }
}

export default LoginactureScreen;
