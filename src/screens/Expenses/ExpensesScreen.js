/*This is an example of File Picker in React Native*/
import React, {createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,

} from 'react-native';
import styles from "./styles"
import {Button,Image} from 'react-native-elements';
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
      showModal: false,
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
        <Image
          source={require('../../../assets/icons/backArrow.png')}
          style={styles.images}
        />
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

        {this.renderFileUri()}
        {this.renderFileData()}
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

