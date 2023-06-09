import React from "react";
import { View, Image } from "react-native";
import { styles } from "../styles/styles";

function UserImage() {
  return (
    <>
      <View style={styles.userImage.circle}>
        <Image
          source={require("../../assets/emptySpace.png")}
          style={{ width: "50%", height: "50%" }}
        />
      </View>
    </>
  );
}

export default UserImage;
