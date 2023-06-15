import React, {useContext} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import mainContext from '../context/mainContext';
import CustomDrawerHead from './CustomDrawerHead';
import auth from '@react-native-firebase/auth';

import {HomeScreen} from '../screens';
import Settings from './Settings';
import { TextInput} from 'react-native-paper';

function Root() {
  const Drawer = createDrawerNavigator();

  const {signOutUser} = useContext(mainContext);

  const email = auth().currentUser.email;

  return (
    <Drawer.Navigator
      drawerContent={props => (
        <>
          <CustomDrawerHead {...props} logout={signOutUser} user={email} />
          <Settings />
        </>
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: '#F49037',
        drawerStyle: {
          backgroundColor: '#F0FFEB',
          marginTop: 0,
          paddingTop: 0,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => {
            return (
              <TextInput.Icon
                icon="gift-open-outline"
                iconColor="#F49037"
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default Root;
