import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {styles} from '../styles/styles';
import {useTranslation} from 'react-i18next';

function LoginWithUser({
  handleOnChangeTextEmail,
  handleOnChangeTextPass,
  handleOnPress,
  textButton,
  disabled,
}) {
  const [hidePass, setHidePass] = useState(true);
  const {t} = useTranslation();

  return (
    <>
      <TextInput
        autoCapitalize="none"
        label={t('login:username')}
        mode="outlined"
        style={{...styles.loginWithUser.inputText, marginTop: 0}}
        onChangeText={handleOnChangeTextEmail}
        theme={{roundness: 8}}
      />
      <TextInput
        autoCapitalize="none"
        label={t('login:password')}
        mode="outlined"
        style={styles.loginWithUser.inputText}
        onChangeText={handleOnChangeTextPass}
        theme={{roundness: 8}}
        secureTextEntry={hidePass}
        right={
          <TextInput.Icon
            icon={hidePass ? 'eye' : 'eye-off'}
            onPress={() => {
              setHidePass(!hidePass);
            }}
            style={{paddingTop: 6}}
            iconColor="rgba(0, 0, 0, 0.3)"
          />
        }
      />
      <View style={{marginTop: 8, marginBottom: 8}}>
        <Button
          onPress={handleOnPress}
          style={{marginVertical: 8, borderRadius: 4}}
          mode="contained"
          disabled={disabled}>
          {textButton}
        </Button>
      </View>
    </>
  );
}

export default LoginWithUser;
