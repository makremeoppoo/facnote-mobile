/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {Image, View, Platform, Text, TouchableHighlight} from 'react-native';
import SplashScreen from '../screens/Splash/SplashScreen';
import OnboardingScreen from '../screens/OnBoarding/OnBoardingScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LogInScreen from '../screens/LogIn/LogInScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import PortfolioScreen from '../screens/Portfolio/PortfolioScreen';
import ExpensesScreen from '../screens/UploadFacture/UploadScreen';

import ProfileScreen from '../screens/Profile/ProfileScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import MenuImage from '../components/MenuImage/MenuImage';
import TabBarItem from '../components/TabBarItem/TabBarItem';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import BackButton from '../components/BackButton/BackButton';
import {SearchBar} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import HomeImg from '../../assets/icons/home.png';
import FactureImg from '../../assets/icons/Camera.png';
import CabinetImg from '../../assets/icons/Cabinet.png';

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
        name="LogIn"
        component={LogInScreen}
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
        labelStyle: {textTransform: 'none', fontSize: 15},
        style: {
          height: 70,
        },
        showLabel: false,
      }}
      initialRouteName="Home">
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem focused={focused} label={'Accueil'} src={HomeImg} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Factures"
        component={ExpensesScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem focused={focused} label={'Déposer facture'} src={FactureImg} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Cabinet"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({tintColor, focused}) => (
            <TabBarItem focused={focused} label={'Cabinet'} src={CabinetImg} />
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
      <Stack.Screen name="Portfolio" component={PortfolioScreen} />
      <Stack.Screen name="Expenses" component={ExpensesScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 17,
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
        headerRight: () => <View />,
      }}>
      <Stack.Screen
        name="Nav"
        options={{
          headerShown: false,
        }}
        component={TabNavigator}
        //component={Platform.OS === 'ios' ? TabNavigator : mainScreensNavigator}
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
          component={Platform.OS === 'ios' ? Navigator : DrawerStack}
        />
      ) : (
        <Root.Screen name="LoginStack" component={LandingNavigator} />
      )}
    </Root.Navigator>
  );
};

const AppContainer = () => {
  return <NavigationContainer>{<RootNavigator />}</NavigationContainer>;
};

export default AppContainer;
