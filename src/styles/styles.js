import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  userImage: {
    circle: {
      width: 66,
      height: 66,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#F5B042",
      borderWidth: 1,
      marginLeft: 16,
      marginTop: 8,
      backgroundColor: "#F0FFEB",
    },
  },
  socialMediaButtons: {
    button: {
      width: 200,
      borderRadius: 10,
      padding: 0,
      justifyContent: "flex-start",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      marginBottom: 8,
      flexDirection: "row",
    },
    buttonLarge: {
      width: 220,
      borderRadius: 10,
      padding: 0,
      justifyContent: "flex-start",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      marginBottom: 8,
      flexDirection: "row",
    },
  },
  rowCard: {
    generalDiv: {
      width: "100%",
      paddingTop: 8,
      paddingLeft: 16,
      paddingRight: 16,
    },
    generalText: {
      width: "100%",
      paddingLeft: 16,
    },
    dialogText: {
      width: "100%",
      fontSize: 20,
      textAlign: "center",
      fontWeight: "400",
    },
    dialogButton: {
      maxWidth: 105,
      borderRadius: 8,
    },
    dialogButtonContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      marginTop: 24,
      marginBottom: 24,
    },
    dialogFirstButton: {
      marginRight: 8,
    },
    plusIconView: {
      width: 36,
      height: 36,
      borderRadius: 50,
      alignItems: "center",
    },
  },
  resetPassword: {
    inputText: {
      width: 301,
      height: 56,
      borderRadius: 8,
      marginTop: 12,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  },
  noItems: {
    divMaster: {
      width: "100%",
      height: Dimensions.get("window").height - 156,
      paddingTop: 32,
    },
    generalContainer: {
      width: "100%",
      alignItems: "center",
    },
    containerText: {
      width: "100%",
      alignItems: "center",
      marginTop: 16,
    },
    texto: {
      width: "100%",
      fontWeight: "500",
      fontSize: 16,
      alignItems: "center",
      textAlign: "center",
    },
  },
  menuTop: {
    divMaster: {
      width: "100%",
      height: 72,
      marginTop: 0,
      backgroundColor: "rgba(66, 254, 22, 0.15)",
      zIndex: 1,
    },
    generalContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuContainer: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    logoContainer: {
      width: Dimensions.get("window").width - 100,
      justifyContent: "center",
      flexDirection: "row",
    },
  },
  loginWithUser: {
    inputText: {
      width: 301,
      height: 56,
      marginTop: 12,
      borderRadius: 16,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  },
  dividerWidthText: {
    line: {
      flex: 1,
      height: 1,
      marginHorizontal: 16,
    },
  },
  customDrawerHead: {
    head: {
      backgroundColor: "rgba(66, 254, 22, 0.15)",
      paddingTop: 8,
      paddingBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    textContainer: {
      paddingTop: 0,
      paddingLeft: 16,
      width: 180,
    },
    hello: {
      fontWeight: "800",
    },
  },
  addNewWish: {
    dialogText: {
      width: "100%",
      fontSize: 18,
      textAlign: "left",
      fontWeight: "400",
      lineHeight: 21,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 32,
    },
    dialogButton: {
      maxWidth: 105,
      borderRadius: 8,
    },
    dialogButtonContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "flex-end",
      marginTop: 24,
      marginBottom: 24,
      paddingRight: 16,
    },
    dialogFirstButton: {
      marginRight: 8,
    },
    inputsContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      width: "100%",
    },
    inputText: {
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  },
  homeScreen: {
    container: {
      flexGrow: 1,
    },
    fabStyle: {
      bottom: 16,
      right: 16,
      position: "absolute",
      backgroundColor: "#F5B042",
      textAlign: "left",
    },
  },
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  logoAndBack: {
    flexDirection: "row",
    width: "100%",
  },
  back: {
    top: 24,
    left: 16,
  },
  backButton: {
    width: 14,
    height: 25,
    top: 0,
    bottom: 0,
  },
  login: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 336,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
  },
  logoPicture: {
    width: 118,
    height: 160,
    top: 20,
    bottom: 0,
  },
  registerText: {
    // fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
  },
  linkText: {
    color: "#F5B042",
    // fontFamily: "Roboto",
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
  },
  forgotText: {
    // fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
  },
  inputText: {
    width: 301,
    height: 56,
    borderRadius: 8,
    marginTop: 16,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  button: {
    width: 200,
    height: "auto",
    borderRadius: 10,
    fontSize: 12,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  social: {
    width: 50,
    marginHorizontal: 6,
  },
  logoWithBack: {
    width: "100%",
    alignItems: "center",
    right: 10,
  },
  registerTextHight: {
    // fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 19,
    textAlign: "center",
  },
  instructionsText: {
    // fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.8)",
    marginTop: 16,
    marginBottom: 8,
    width: 301,
  },
});
