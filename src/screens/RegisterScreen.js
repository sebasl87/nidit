import React, {useState, useContext} from 'react';
import {Image, Text, View, ScrollView, TouchableHighlight} from 'react-native';

import {LoginWithUser, DividerWithText, SocialMediaButton} from '../components';

import mainContext from '../context/mainContext';
import {styles} from '../styles/styles';
import {useTranslation} from 'react-i18next';

function RegisterScreen({navigation}) {
  const {handleALogin, handleGLogin, handleSignup} = useContext(mainContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.login}>
          <View style={styles.logoAndBack}>
            <View style={styles.back}>
              <TouchableHighlight
                onPress={() => navigation.navigate('Login')}
                activeOpacity={1}
                underlayColor="transparent">
                <Image
                  source={require('../../assets/back.png')}
                  style={styles.backButton}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.logoWithBack}>
              <Image
                source={require('../../assets/nidit-logo.png')}
                style={styles.logoPicture}
              />
            </View>
          </View>
          <View style={{top: -10}}>
            <Text style={styles.registerTextHight}>
              {t('register:welcome')}
            </Text>
          </View>
          <LoginWithUser
            handleOnChangeTextPass={text => setPassword(text)}
            handleOnChangeTextEmail={text => setEmail(text)}
            handleOnPress={() => handleSignup(email, password)}
            textButton={t('register:register')}
          />
          <DividerWithText text={t('register:or')} />
          <View style={{marginTop: 8, marginBottom: 24}}>
            <SocialMediaButton
              text={t('register:regapple')}
              handleCreateAccount={() => handleALogin()}
              icono={() => (
                <Image
                  source={require('../../assets/appleI.png')}
                  style={{width: 30, height: 30}}
                />
              )}
            />
            {/* <SocialMediaButton
                text={t("register:regfacebook")}
                handleCreateAccount={() => handleFBLogin()}
                icono={() => (
                  <Image
                    source={require("../../assets/facebookI.png")}
                    style={{ width: 30, height: 30 }}
                  />
                )}
              /> */}
            <SocialMediaButton
              text={t('register:reggoogle')}
              handleCreateAccount={() => handleGLogin()}
              icono={() => (
                <Image
                  source={require('../../assets/googleI.png')}
                  style={{width: 30, height: 30}}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;
