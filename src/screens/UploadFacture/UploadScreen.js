/*This is an example of File Picker in React Native*/
import React, {createRef} from 'react';
import {ScrollView, Text, View, TouchableHighlight,ImageBackground,Image} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-picker';
import Achat from '../../../assets/images/Achats.png';
import AvanceDeFrais from '../../../assets/images/AvanceDeFrais.png';
import Document from '../../../assets/images/Document.png';
import Indemnite from '../../../assets/images/Indemnite.png';
import Background from '../../../assets/images/backgroung_depose_facture.png';
import styles from "./styles"

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
    this.actionSheet.current.show();
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
      return <Image source={require('../../../assets/icons/backArrow.png')} />;
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
          <View
            style={styles.btnContainer}
            onPress={() => this.setTypeFacture(1)}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Image style={styles.Img} source={Indemnite} />
          </View>
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
          {this.renderFileUri()}
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
        </View>
      </ScrollView>
    );
  }
}
