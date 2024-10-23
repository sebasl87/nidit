import React, {useState, useMemo, useEffect} from 'react';
import {StatusBar, View, Alert, Linking} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler'; // Importamos GestureHandlerRootView
import mainContext from './src/context/mainContext';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import './src/localization/i18n';

import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  DashboardScreen,
} from './src/screens';
import Root from './src/components/Root';
import Client from './src/services/apollo/Client';
import {ApolloProvider} from '@apollo/client';
import {
  doLogin,
  doSignup,
  doLogout,
  doReset,
} from './src/services/loginServices';
import {googleLogin, appleLogin} from './src/services/loginSocialMedia';
import theme from './src/customTheme';

const Stack = createNativeStackNavigator();
export const navigationRef = React.createRef();

export default function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isDeepLink, setIsDeepLink] = useState(false);

  function onAuthStateChanged(user) {
    setUserProfile(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    const handleDeepLink = event => {
      const url = event.url;
      const dashboardId = url.split('/dashboard/')[1];

      if (dashboardId) {
        setIsDeepLink(true);
        navigationRef.current?.navigate('Dashboard', {dashboardId});
      }
    };

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({url});
    });

    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, []);

  const mainC = useMemo(
    () => ({
      userProfile: {userProfile},
      signOutUser: () => doLogout(),
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
      handleALogin: () => appleLogin(),
    }),
    [userProfile],
  );

  const navTheme = DefaultTheme;
  navTheme.colors.background = '#D1EFA7';

  return (
    <ApolloProvider client={Client}>
      <mainContext.Provider value={mainC}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer ref={navigationRef} theme={navTheme}>
            <PaperProvider theme={theme}>
              <View style={{height: 28, backgroundColor: '#D1EFA7'}}>
                <StatusBar translucent backgroundColor="#000" />
              </View>
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                {!isDeepLink && (
                  <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen
                      name="ForgotPassword"
                      component={ForgotPasswordScreen}
                    />
                    <Stack.Screen name="NewUser" component={RegisterScreen} />
                    {userProfile && (
                      <Stack.Screen name="Root" component={Root} />
                    )}
                  </>
                )}
              </Stack.Navigator>
              <Toast />
            </PaperProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </mainContext.Provider>
    </ApolloProvider>
  );
}
