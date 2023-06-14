/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useEffect} from 'react';

import auth from '@react-native-firebase/auth';
import Root from './src/components/Root';
import {StatusBar, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import mainContext from './src/context/mainContext';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
import "./src/localization/i18n"; 


import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  HomeScreen,
} from './src/screens';

import theme from './src/customTheme';


import Client from './src/services/apollo/Client';
import {ApolloProvider} from '@apollo/client';

import {
  doLogin,
  doSignup,
  doLogout,
  doReset,
} from './src/services/loginServices';

import {
  googleLogin,
  // facebookLogin,
  appleLogin,
} from './src/services/loginSocialMedia';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [userID, setUserID] = useState(null);

  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUserProfile(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const mainC = useMemo(
    () => ({
      userProfile: {userProfile},
      signOutUser: () => doLogout(),
      userID: {userID},
      setUserID: value => setUserID(value),
      handleLogin: (email, password) => {
        doLogin(email, password);
      },
      handleSignup: (email, password) => {
        doSignup(email, password);
      },
      handleResetPassword: email => {
        doReset(email);
      },
      handleGLogin: () => googleLogin(),
      // handleFBLogin: () => facebookLogin(),
      handleALogin: () => appleLogin(),
    }),
    [userProfile, userID],
  );

  const navTheme = DefaultTheme;
  navTheme.colors.background = '#D1EFA7';

  return (
    <ApolloProvider client={Client}>
      <mainContext.Provider value={mainC}>
        <NavigationContainer theme={navTheme}>
          <PaperProvider theme={theme}>
            <View style={{height: 28}}>
              <StatusBar translucent backgroundColor="#000" />
            </View>
            <Stack.Navigator
              initialRouteName="Login"
              options={{headerShown: false}}>
              {userProfile ? (
                <>
                  <Stack.Screen
                    name="Root"
                    component={Root}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="NewUser"
                    component={RegisterScreen}
                    options={{headerShown: false}}
                  />
                </>
              )}
            </Stack.Navigator>
            <Toast />
          </PaperProvider>
        </NavigationContainer>
      </mainContext.Provider>
    </ApolloProvider>
  );
}
