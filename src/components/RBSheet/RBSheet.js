import React from 'react';
import {TouchableHighlight, Image, Text, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import {StyleSheet} from 'react-native';
import ScaleHelpers from '../../Theme/scaleHelpers';

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    flexDirection: 'row',
    height: ScaleHelpers.CalcHeight(15),
  },
  bottomSheetAction: {
    marginTop: ScaleHelpers.CalcHeight(1),
    marginBottom: ScaleHelpers.CalcHeight(1),
    marginLeft: ScaleHelpers.CalcWidth(1),
    marginRight: ScaleHelpers.CalcWidth(1),

    height: ScaleHelpers.CalcHeight(11),
    alignItems: 'center',
  },
  bottomSheetText: {
    textAlign: 'center',
    color: '#707070',
    fontFamily: 'Nunito-Light',
    fontSize: ScaleHelpers.CalcWidth(3.8),
  },
  verticleLine: {
    marginTop: ScaleHelpers.CalcHeight(2),
    height: '80%',
    width: 1,
    backgroundColor: '#909090',
  },
});

export default class BackButton extends React.Component {
  open = () => {
    this.Standard.open();
  };

  close = () => {
    this.Standard.close();
  };

  render() {
    return (
      <RBSheet
        ref={(ref) => {
          this.Standard = ref;
        }}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },

          container: {
            backgroundColor: '#F8F8F8',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
        height={ScaleHelpers.CalcHeight(15)}>
        <View style={styles.bottomSheetContainer}>
          {this.props.menus.map((item, index) => (
            <View key={index}>
              <TouchableHighlight
                style={[
                  {
                    width:
                      this.props.menus.length == 4
                        ? ScaleHelpers.CalcWidth(22)
                        : this.props.menus.length == 2
                        ? ScaleHelpers.CalcWidth(42)
                        : ScaleHelpers.CalcWidth(33),
                  },
                ]}
                onPress={item.onPress}
                underlayColor="rgba(73,182,77,1,0.9)">
                <View
                  style={[
                    styles.bottomSheetAction,
                    index != 0
                      ? {borderLeftWidth: 0.5, borderLeftColor: 'grey'}
                      : {},
                  ]}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    size={30}
                    underlayColor="rgba(128, 128, 128, 0.1)"
                    color="#707070"
                  />

                  <Text style={styles.bottomSheetText}>{item.label}</Text>
                </View>
              </TouchableHighlight>
              <View
                style={[
                  styles.verticleLine,
                  {
                    display:
                      this.props.menus.length != 1 &&
                      index != this.props.menus.length - 1
                        ? 'flex'
                        : 'none',
                  },
                ]}></View>
            </View>
          ))}
        </View>
      </RBSheet>
    );
  }
}
