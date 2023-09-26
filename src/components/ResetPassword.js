import React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { styles } from "../styles/styles";

function ResetPassword({ handleOnChangeTextEmail, handleOnPress, textButton }) {
  return (
    <>
      <TextInput
        autoCapitalize="none"
        label="Email"
        mode="outlined"
        style={{ ...styles.resetPassword.inputText, marginTop: 0 }}
        onChangeText={handleOnChangeTextEmail}
        theme={{ roundness: 8 }}
      />
      <View style={{ marginTop: 16, marginBottom: 24 }}>
        <Button
          onPress={handleOnPress}
          style={{ marginVertical: 8, borderRadius: 4 }}
          mode="contained"
        >
          {textButton}
        </Button>
      </View>
    </>
  );
}

export default ResetPassword;
