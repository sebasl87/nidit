import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";

import {
  REACT_APP_BASE_WEB_CLIENT_ID,
  REACT_APP_BASE_IOS_CLIENT_ID,
} from "@env";

GoogleSignin.configure({
  webClientId: REACT_APP_BASE_WEB_CLIENT_ID,
  iosClientId: REACT_APP_BASE_IOS_CLIENT_ID,
});

// LOGIN GOOGLE
export async function googleLogin() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

// LOGIN FACEBOOK
// export const facebookLogin = async () => {
//   // Attempt login with permissions
//   const result = await LoginManager.logInWithPermissions([
//     "public_profile",
//     "email",
//   ]);

//   if (result.isCancelled) {
//     throw "User cancelled the login process";
//   }

//   // Once signed in, get the users AccesToken
//   const data = await AccessToken.getCurrentAccessToken();

//   if (!data) {
//     throw "Something went wrong obtaining access token";
//   }

//   // Create a Firebase credential with the AccessToken
//   const facebookCredential = auth.FacebookAuthProvider.credential(
//     data.accessToken
//   );

//   // Sign-in the user with the credential
//   return auth().signInWithCredential(facebookCredential);
// };

// LOGIN APPLE
export const appleLogin = async () => {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error("Apple Sign-In failed - no identify token returned");
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce
  );

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential);
};
