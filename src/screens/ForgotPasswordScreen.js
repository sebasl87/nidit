import React, { useContext, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { ResetPassword } from "../components";
import mainContext from "../context/mainContext";
import { styles } from "../styles/styles";
import { useTranslation } from "react-i18next";

function ForgotPasswordScreen({ navigation }) {
  const { handleResetPassword } = useContext(mainContext);

  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD194", "#70E1F5"]}
        style={styles.background}
        start={{ x: 0, y: 1 }}
        end={{ x: 0.75, y: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.login}>
            <View style={styles.logoAndBack}>
              <View style={styles.back}>
                <TouchableHighlight
                  onPress={() => navigation.navigate("Login")}
                  hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                  activeOpacity={1}
                  underlayColor="transparent"
                >
                  <View>
                    <Image
                      source={require("../../assets/back.png")}
                      style={styles.backButton}
                    />
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.logoWithBack}>
                <Image
                  source={require("../../assets/nidit-logo.png")}
                  style={styles.logoPicture}
                />
              </View>
            </View>
            <View style={{ top: -10 }}>
              <Text style={styles.registerTextHight}>
                {t("fogotPass:repass")}
              </Text>
              <Text style={styles.instructionsText}>{t("fogotPass:info")}</Text>
            </View>
            <ResetPassword
              textButton={t("fogotPass:send")}
              handleOnPress={() => handleResetPassword(email)}
              handleOnChangeTextEmail={setEmail}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

export default ForgotPasswordScreen;
