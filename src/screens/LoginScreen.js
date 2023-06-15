import React, { useState, useContext } from "react";
import { Image, Text, View, ScrollView, Platform } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import {
  LoginWithUser,
  DividerWithText,
  SocialMediaButton,
  Settings,
} from "../components";

import { styles } from "../styles/styles";

import mainContext from "../context/mainContext";

import { useTranslation } from "react-i18next";

function LoginScreen({ navigation }) {
  const { handleALogin, handleGLogin, handleLogin, handleFBLogin } =
    useContext(mainContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const notDisabled = email.length > 0 && password.length > 0;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD194", "#D1EFA7"]}
        style={styles.background}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.85 }}
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
            <Image
              source={require("../../assets/nidit-logo.png")}
              style={styles.logoPicture}
            />
            <View style={{ top: -10 }}>
              <Text style={styles.registerText}>
                {t("login:welcome")}
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate("NewUser")}
                >
                  {t("login:newAccount")}
                </Text>
              </Text>
            </View>
            <LoginWithUser
              handleOnChangeTextPass={(text) => setPassword(text)}
              handleOnChangeTextEmail={(text) => setEmail(text)}
              handleOnPress={() => handleLogin(email, password)}
              textButton={t("login:login")}
              disabled={!notDisabled}
            />
            <View>
              <Text style={styles.forgotText}>
                {t("login:ups")}
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  {t("login:password")}
                </Text>
              </Text>
            </View>
            <DividerWithText text={t("login:or")} />
            <View style={{ marginTop: 8, marginBottom: 8 }}>
              {Platform.OS === "ios" && (
                <SocialMediaButton
                  text={t("login:inapple")}
                  handleCreateAccount={() => handleALogin()}
                  icono={() => (
                    <Image
                      source={require("../../assets/appleI.png")}
                      style={{ width: 30, height: 30 }}
                    />
                  )}
                />
              )}
              {/* <SocialMediaButton
                text={t("login:infacebook")}
                handleCreateAccount={() => handleFBLogin()}
                icono={() => (
                  <Image
                    source={require("../../assets/facebookI.png")}
                    style={{ width: 30, height: 30 }}
                  />
                )}
              /> */}
              <SocialMediaButton
                text={t("login:ingoogle")}
                handleCreateAccount={() => handleGLogin()}
                icono={() => (
                  <Image
                    source={require("../../assets/googleI.png")}
                    style={{ width: 30, height: 30 }}
                  />
                )}
              />
            </View>
            <Settings />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

export default LoginScreen;
