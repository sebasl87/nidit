import React, { useContext } from "react";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";

import mainContext from "../context/mainContext";
import CustomDrawerHead from "./CustomDrawerHead";
import auth from "@react-native-firebase/auth";

import { HomeScreen } from "../screens";
import Settings from "./Settings";

function Root() {
  const Drawer = createDrawerNavigator();

  const { signOutUser } = useContext(mainContext);

  const email = auth().currentUser.email;

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <>
          <CustomDrawerHead {...props} logout={signOutUser} user={email} />
          <Settings />
        </>
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "transparent",
        drawerActiveTintColor: "#F49037",
        drawerStyle: {
          backgroundColor: "#F0FFEB",
          marginTop: 0,
          paddingTop: 0,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => {
            // return <Ionicons name="home-outline" size={18} color="#F49037" />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default Root;
