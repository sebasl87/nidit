import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { styles } from "../styles/styles";

const DividerWithText = ({ text }) => {
  const theme = useTheme();

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}
    >
      <View
        style={{
          ...styles.dividerWidthText.line,
          backgroundColor: theme.colors.primary,
        }}
      />
      <View>
        <Text style={{ textAlign: "center", fontSize: 12 }}>{text}</Text>
      </View>
      <View
        style={{
          ...styles.dividerWidthText.line,
          backgroundColor: theme.colors.primary,
        }}
      />
    </View>
  );
};

export default DividerWithText;
