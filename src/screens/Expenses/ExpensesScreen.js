/*This is an example of File Picker in React Native*/
import React, {createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';

var optionArray = [
  'chooseImage',
  'launchCamera',
  'launchImageLibrary',
  'Cancel',
];

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
      showModal:false
    };
    this.actionSheet = createRef();
  }

  setTypeFacture = (typeFacture) => {
    this.setState({typeFacture});
    this.setModalVisible();
    this.actionSheet.current.show();
  };

  setModalVisible = () => {
    this.setState({showModal: !this.state.showModal});
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

  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image source={require('../../../assets/icons/backArrow.png')} style={styles.images} />
      );
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('../../../assets/icons/backArrow.png')}
          style={styles.images}
        />
      );
    }
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text
          style={{
            color: '#54aed6',
            fontSize: 35,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 60,
            marginBottom: 60,
          }}>
          Facnote
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => this.setModalVisible()}>
          {/*Multiple files selection button*/}
          <Text
            style={{
              color: '#54aed6',
              fontSize: 35,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 60,
              marginBottom: 60,
            }}>
            Appuyer ici pour sélectionner les factures d' achat a envoyer
          </Text>
        </TouchableOpacity>
       
        <TouchableHighlight
          style={styles.btnClickContain}
          underlayColor="#54d66a">
          <View style={styles.btnContainer}>
            <Icon name={'ios-send-sharp'} size={32} style={{color: 'white'}} />
            <Text style={styles.btnText}>envoyer</Text>
          </View>
        </TouchableHighlight>
        <ActionSheet
          ref={this.actionSheet}
          // Title of the Bottom Sheet
          title={'Which one do you like ?'}
          // Options Array to show in bottom sheet
          options={optionArray}
          // Define cancel button index in the option array
          // This will take the cancel option in bottom
          // and will highlight it
          cancelButtonIndex={4}
          // Highlight any specific option
          destructiveButtonIndex={1}
          onPress={(index) => {
            // Clicking on the option will give you alert

            if (optionArray[index] == 'launchImageLibrary')
              this.launchImageLibrary();
            if (optionArray[index] == 'chooseImage') this.chooseImage();
            if (optionArray[index] == 'launchCamera') this.launchCamera();
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => {}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Button
                onPress={() => this.setTypeFacture(1)}
                title="Avance de frais"
                type="clear"></Button>
              <Button
                onPress={() => this.setTypeFacture(2)}
                title="Achat"
                type="clear"></Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnClickContain: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#54d66a',
    color: 'white',
    borderRadius: 5,
    padding: 15,
    marginTop: 80,
    marginBottom: 80,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'center',
    borderRadius: 10,
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  btnText: {
    fontSize: 18,
    color: '#FAFAFA',
    marginLeft: 10,
    marginTop: 2,
  },
  containerStyle: {
    flex: 1,
    padding: 16,
  },

  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
