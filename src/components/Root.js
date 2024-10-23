import React, { useContext, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import mainContext from '../context/mainContext';
import CustomDrawerHead from './CustomDrawerHead';
import auth from '@react-native-firebase/auth';
import { HomeScreen } from '../screens';
import Settings from './Settings';
import { TextInput } from 'react-native-paper';

function Root() {
  const Drawer = createDrawerNavigator();
  const { signOutUser } = useContext(mainContext);
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      navigation.navigate('Login'); // Redirigir si no está autenticado
    }
  }, [navigation]);

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <>
          <CustomDrawerHead {...props} logout={signOutUser} />
          <Settings />
        </>
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: '#F49037',
        drawerStyle: { backgroundColor: '#F0FFEB' },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <TextInput.Icon icon="gift-open-outline" iconColor="#F49037" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default Root;
