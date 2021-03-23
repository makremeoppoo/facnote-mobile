/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import CabinetBackground from '../../../assets/images/Rectangle.png';
import rightArrow from '../../../assets/icons/rightArrow.png';
import {connect} from 'react-redux';
import {text, routes, permissions} from '../../constants';
import {userHasPermission} from '../../functions/userHasPermission';

class MoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSale: false,
      canHistory: false,
      canPurchase: false,
    };
  }

  async componentDidMount() {
    var canSale = await userHasPermission(permissions.sales);
    var canPurchase = await userHasPermission(permissions.purchases);
    var canHistory = await userHasPermission(permissions.history);
    this.setState({canSale, canPurchase, canHistory});
  }

  render() {
    const {canSale, canPurchase, canHistory} = this.state;

    return (
      <View>
        <Image source={CabinetBackground} style={styles.topImageStyle}></Image>
        <View style={styles.header}>
          {/* <Image style={styles.polygonImg} source={Polygone} />
          
          <Text style={styles.headerBigText}>{text.nomComplet}</Text>
         

          <Text style={styles.headerText}>{text.voirProfile}</Text>*/}
        </View>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate(routes.Cabinet)}
          underlayColor="rgba(73,182,77,1,0.9)">
          <View style={styles.cabinetCard}>
            <Text style={styles.cabinetText}>{text.voirSociete}</Text>
          </View>
        </TouchableHighlight>
        <ScrollView>
          <View style={styles.content}>
            {canHistory && (
              <TouchableHighlight
                onPress={() =>
                  this.props.navigation.navigate(
                    routes.HistoryOfPayementReceipts,
                  )
                }
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>
                      {text.HistoriqueJustificatifs}
                    </Text>
                  </View>
                  <Image style={styles.rightArrow} source={rightArrow} />
                </View>
              </TouchableHighlight>
            )}
            {canSale && (
              <TouchableHighlight
                onPress={() =>
                  this.props.navigation.navigate(routes.MyPurchases)
                }
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>{text.MesAchats}</Text>
                  </View>
                  <Image style={styles.rightArrow} source={rightArrow} />
                </View>
              </TouchableHighlight>
            )}
            {canPurchase && (
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate(routes.Sales)}
                underlayColor="rgba(73,182,77,1,0.9)">
                <View style={styles.itemContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.itemTitle}>{text.Ventes}</Text>
                  </View>
                  <Image style={styles.rightArrow} source={rightArrow} />
                </View>
              </TouchableHighlight>
            )}

            {/* 
          


            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Profile')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.itemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.itemTitle}>Notes de frais</Text>
                </View>
                <Image style={styles.rightArrow} source={rightArrow} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Profile')}
              underlayColor="rgba(73,182,77,1,0.9)">
              <View style={styles.itemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.itemTitle}>GED</Text>
                </View>
                <Image style={styles.rightArrow} source={rightArrow} />
              </View>
            </TouchableHighlight>
        */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth,
});
export default connect(mapStateToProps)(MoreScreen);
