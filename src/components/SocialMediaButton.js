import React from "react";
import { Button } from "react-native-paper";
import { styles } from "../styles/styles";

const SocialMediaButton = ({ text, handleCreateAccount, icono }) => {
  return (
    <Button
      mode="contained"
      onPress={handleCreateAccount}
      style={styles.socialMediaButtons.button}
      icon={icono}
      buttonColor="rgba(255, 255, 255, 0.8)"
      textColor="#000"
      labelStyle={{ fontSize: 12 }}
    >
      {text}
    </Button>
  );
};

export default SocialMediaButton;
