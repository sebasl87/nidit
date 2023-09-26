import React from 'react';
import {View, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {styles} from '../styles/styles';
import {useTranslation} from 'react-i18next';

function AddNewWish({
  closeAddWishDialog,
  formData,
  handleOnPress,
  onChangeDescription,
  onChangeLink,
  onChangeTitle,
}) {
  const {t} = useTranslation();

  return (
    <>
      <View>
        <Text style={styles.addNewWish.dialogText}>
          {t('home:newWish.info')}
        </Text>
        <View style={styles.addNewWish.inputsContainer}>
          <TextInput
            label={t('home:newWish.title')}
            mode="outlined"
            onChangeText={onChangeTitle}
            placeholder={t('home:newWish.name')}
            style={{...styles.addNewWish.inputText, marginTop: 0}}
            theme={{roundness: 8}}
            value={formData?.title}
          />
          <TextInput
            label={t('home:newWish.description')}
            mode="outlined"
            multiline
            onChangeText={onChangeDescription}
            placeholder={t('home:newWish.descriptionInfo')}
            style={{...styles.addNewWish.inputText, marginTop: 16, height:140}}
            theme={{roundness: 8}}
            defaultValue={formData?.description}
          />
          <TextInput
            label="Link"
            mode="outlined"
            onChangeText={onChangeLink}
            placeholder={t('home:newWish.link')}
            style={{...styles.addNewWish.inputText, marginTop: 16}}
            theme={{roundness: 8}}
            value={formData?.link}
          />
        </View>
        <View style={styles.addNewWish.dialogButtonContainer}>
          <Button
            buttonColor="rgba(245, 176, 66, 1)"
            onPress={closeAddWishDialog}
            textColor="#fff"
            style={[
              styles.addNewWish.dialogButton,
              styles.addNewWish.dialogFirstButton,
            ]}>
            {t('home:newWish.cancel')}
          </Button>
          <Button
            buttonColor="rgba(245, 176, 66, 1)"
            onPress={() => handleOnPress()}
            style={styles.addNewWish.dialogButton}
            textColor="#fff">
            {t('home:newWish.save')}
          </Button>
        </View>
      </View>
    </>
  );
}

export default AddNewWish;
