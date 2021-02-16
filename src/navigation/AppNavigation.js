/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

import {logout} from '../redux';
import {View, Platform, Image} from 'react-native';
import SplashScreen from '../screens/Splash/SplashScreen';
import OnboardingScreen from '../screens/OnBoarding/OnBoardingScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ExpensesScreen from '../screens/UploadFacture/UploadScreen';
import IndemnitiesScreen from '../screens/Indemnities/IndemnitiesScreen';
import HistoryScreen from '../screens/HistoryOfPayementReceipts/HistoryScreen';
import BankStatementScreen from '../screens/BankStatement/BankStatementScreen';


import MoreScreen from '../screens/More/MoreScreen';

import ProfileScreen from '../screens/Profile/ProfileScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import MenuImage from '../components/MenuImage/MenuImage';
import NavigationHeader from '../components/NavigationHeader/NavigationHeader';

import BackButton from '../components/BackButton/BackButton';

import TabBarItem from '../components/TabBarItem/TabBarItem';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import HomeImg from '../../assets/icons/home.png';
import HomeBleu from '../../assets/icons/HomeBleu.png';

import FactureImgActive from '../../assets/icons/Camera.png';
import FactureImg from '../../assets/icons/photo-white.png';

import CabinetImg from '../../assets/icons/Cabinet.png';
import CabinetImgActive from '../../assets/icons/cabinetActive.png';

import IndicateurImg from '../../assets/icons/Indicateur.png';
import IndicateurImgActive from '../../assets/icons/IndicateurBleu.png';

import PlusImg from '../../assets/icons/Plus_white.png';
import PlusImgActive from '../../assets/icons/plusBlue.png';
import BackgroundNavigation from '../../assets/images/CabinetBackground1.png';
import getCabinet from '../services/cabinet';
import ScaleHelpers from '../components/scaleHelpers';


const Stack = createStackNavigator();
const BottomTabNavigator = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const LandingNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: 'true',
          title: '',
        }}
        name="SignUp"
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

//ios
const TabNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      tabBarOptions={{
        labelStyle: {textTransform: 'none', fontSize: ScaleHelpers.CalcWidth(15)},
        style: {
          height: ScaleHelpers.CalcHeight(12),
        },
        showLabel: false,
      }}
      initialRouteName="Factures">
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              focused={focused}
              label={'Accueil'}
              src={focused ? HomeBleu : HomeImg}
            />
          ),
        }}
      />
      {/*<BottomTabNavigator.Screen
        name="Indicateur"
        component={HomeScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              focused={focused}
              label={'Indicateur'}
              src={focused ? IndicateurImgActive : IndicateurImg}
            />
          ),
        }}
      />*/}
      <BottomTabNavigator.Screen
        name="Factures"
        component={ExpensesScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              focused={focused}
              label={'Déposer facture'}
              src={focused ? FactureImgActive : FactureImg}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Cabinet"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              focused={focused}
              label={'Cabinet'}
              src={focused ? CabinetImgActive : CabinetImg}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Plus"
        component={MoreScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem
              focused={focused}
              label={'Plus'}
              src={focused ? PlusImgActive : PlusImg}
            />
          ),
        }}
      /> 
    </BottomTabNavigator.Navigator>
  );
};

//android
const mainScreensNavigator = () => {
  //const state = useNavigationState(state => state);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({navigation}) => {
        /*var {routeName} = navigation.state.routes[navigation.state.index];
        if (routeName == 'BankAccounts') {
          routeName = 'Bank Accounts';
        }*/
        return {
          //headerTitle: routeName,

          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            color: 'white',
            flex: 1,
          },
          headerStyle: {
            backgroundColor: '#4a7bd0',
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => <View />,
        };
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerStyle: {
            backgroundColor:
              'linear-gradient(0.25turn,rgb(78,199,245), rgb(92,117,254))',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'SegoeUI',
          },
          headerLeft: () => (
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        };
      }}>
      <Stack.Screen
        name="Nav"
        options={{
          headerShown: false,
        }}
        component={TabNavigator}
        //component={Platform.OS === 'ios' ? TabNavigator : mainScreensNavigator}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Indemnities"
        component={IndemnitiesScreen}
      />
      <Stack.Screen
        options={({navigation}) => {
          return {
            header: () => (
              <NavigationHeader
                onPress={() => {
                  navigation.goBack();
                }}
                title={'Historique des justifcatifs'}
              />
            ),
          };
        }}
        name="HistoryOfPayementReceipts"
        component={HistoryScreen}
      />
       <Stack.Screen
        options={({navigation}) => {
          return {
            header: () => (
              <NavigationHeader
                onPress={() => {
                  navigation.goBack();
                }}
                title={'Relevés bancaires'}
              />
            ),
          };
        }}
        name="BankStatement"
        component={BankStatementScreen}
      />
    </Stack.Navigator>
  );
};

//ios
const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Landing" component={LandingNavigator} />
      <Stack.Screen
        options={{headerShown: false}}
        name="Main"
        component={MainNavigator}
      />
    </Stack.Navigator>
  );
};

//android
const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerContent={({navigation, state}) => {
        return <DrawerContainer navigation={navigation} />;
      }}
      drawerStyle={{width: 250}}
      initialRouteName="Main">
      <Drawer.Screen name="Landing" component={LandingNavigator} />
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
};

// Manifest of possible screens
const Root = createStackNavigator();
const RootNavigator = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: 'black',
      }}
      initialRouteName="DrawerStack">
      {isLoggedIn ? (
        <Root.Screen
          name="DrawerStack"
          component={Platform.OS === 'ios' ? Navigator : Navigator}
        />
      ) : (
        <Root.Screen name="LoginStack" component={LandingNavigator} />
      )}
    </Root.Navigator>
  );
};

class AppContainer extends React.Component {
  async componentDidMount() {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const decodeToken = jwtDecode(accessToken);
    console.log('dataUser', decodeToken.exp);
    var dayInMilliseconds = 1000;

    var intervalId = setInterval(() => {
      if (decodeToken.exp < moment().unix()) this.props.logout();
      return;
    }, dayInMilliseconds);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  render() {
    return <NavigationContainer>{<RootNavigator />}</NavigationContainer>;
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {logout})(AppContainer);
