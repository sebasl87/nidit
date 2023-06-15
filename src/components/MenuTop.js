import React from "react";
import { View, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";
import { styles } from "../styles/styles";
import Hamburger from "./Hamburger";

function MenuTop() {
  const nav = useNavigation();
  const drawerStatus = useDrawerStatus();

  return (
    <>
      <View style={styles.menuTop.divMaster}>
        <View style={styles.menuTop.generalContainer}>
          <View style={styles.menuTop.menuContainer}>
            <View style={{ marginTop: 10 }}>
              <Hamburger
                type="spinCross"
                active={drawerStatus === "open"}
                onPress={() => nav.toggleDrawer()}
                underlayColor="transparent"
                color="black"
              ></Hamburger>
            </View>
          </View>
          <View style={styles.menuTop.logoContainer}>
            <Image
              source={require("../../assets/IsoLogo.png")}
              style={{ width: 180, height: 60 }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default MenuTop;
