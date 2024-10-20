import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";

export const doSignup = async (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "❌ Error",
        text2: error,
      });
    });
};

export const doLogin = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "❌ Error",
        text2: error,
      });
      console.log(error);
    });
};

export const doLogout = () => {
  auth()
    .signOut()
    .catch((error) => {
      console.log(error);
    });
};

export const doReset = (email) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Password reset email sent");
    })
    .catch((error) => {
      console.log(error);
    });
};
