/* eslint-disable comma-dangle */
import React from 'react';
import {TouchableOpacity, Image, View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSlidersH,
  faChevronLeft,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import ModalSelector from 'react-native-modal-selector';

import ScaleHelpers from '../../Theme/scaleHelpers';
import background from '../../../assets/images/galery/NavigationBackground.png';
import {logout} from '../../redux';

class NavigationHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContain}>
        <Image style={styles.headerButtonImage} source={background} />
        {this.props.onPress && (
          <TouchableOpacity
            style={{
              width: ScaleHelpers.CalcWidth(10),
              height: ScaleHelpers.CalcWidth(5),
              paddingLeft: ScaleHelpers.CalcWidth(5),
              alignItems: 'center',
            }}
            onPress={this.props.onPress}>
            <FontAwesomeIcon icon={faChevronLeft} size={25} color="white" />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          {this.props.showSelectExecices && (
            <View style={styles.inputContainer}>
              <ModalSelector
                cancelText={'Fermer'}
                data={this.props.exercises}
                onChange={(option) => {
                  this.props.setExercise(option)
                 
                }}>
                <TextInput
                  placeholder="exercises"
                  style={styles.label}
                  editable={false}
                  value={this.props.exercise.label}
                  placeholderTextColor="white"
                />
              </ModalSelector>
            </View>
          )}
        </View>

        {this.props.onPressTwo && (
          <TouchableOpacity
            style={{
              width: ScaleHelpers.CalcWidth(10),
              height: ScaleHelpers.CalcWidth(5),
              paddingRight: ScaleHelpers.CalcWidth(5),
              alignItems: 'center',
            }}
            onPress={this.props.onPressTwo}>
            <FontAwesomeIcon icon={faSlidersH} size={25} color="white" />
          </TouchableOpacity>
        )}
        {this.props.powerOff && (
          <TouchableOpacity
            style={{
              width: ScaleHelpers.CalcWidth(10),
              height: ScaleHelpers.CalcWidth(5),
              paddingLeft: ScaleHelpers.CalcWidth(5),
              paddingBottom: ScaleHelpers.CalcHeight(10),
            }}
            onPress={() => this.props.logout()}>
            <FontAwesomeIcon icon={faPowerOff} size={25} color="white" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps, {logout})(NavigationHeader);
