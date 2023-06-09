import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [lang, changeLang] = useState("es");

  useEffect(() => {
    lang && i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.language}> {t("login:change_language")}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableHighlight
          onPress={() => {
            changeLang("es");
          }}
        >
          <Image
            source={require("../../../assets/argentina.png")}
            style={{ width: 24, height: 24, margin: 3 }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            changeLang("en");
          }}
        >
          <Image
            source={require("../../../assets/united-states.png")}
            style={{ width: 24, height: 24, margin: 3 }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default Settings;
const styles = StyleSheet.create({
  language: {
    textAlign: "center",
    width: "100%",
  },
});
