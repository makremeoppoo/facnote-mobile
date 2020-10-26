/*This is an example of File Picker in React Native*/
import React, {createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
var optionArray = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Cancel',
];
export default class ExpensesScreen extends React.Component {
  constructor(props) {
    super(props);
    //Initialization of the state to store the selected file related attribute
    this.state = {
      multipleFile: [],
      showModal: false,
      typeFacture: null,
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
  selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
      }
      console.log(results);
      //Setting the state to show multiple file attributes
      this.setState({multipleFile: results});
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

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
            alert(optionArray[index]);
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
