/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react';
import {MenuTop, NoItems, RowCard, AddNewWish} from '../components';

import {View, ScrollView} from 'react-native';
import {
  AnimatedFAB,
  Portal,
  Dialog,
  ActivityIndicator,
} from 'react-native-paper';
import mainContext from '../context/mainContext';
import {styles} from '../styles/styles';
import auth from '@react-native-firebase/auth';

import {useTranslation} from 'react-i18next';
import {useWishes} from '../services/hooks/useWishes';
import Toast from "react-native-toast-message";

function HomeScreen({visible}) {
  const {t} = useTranslation();

  const {signOutUser} = useContext(mainContext);

  const [isExtended, setIsExtended] = useState(true);
  const [iDEditing, setIDEditing] = useState(null);

  const [openModalNewWish, setOpenModalNewWish] = useState(false);
  const [formWish, setFormWish] = useState();

  const {data: wishes = [], isLoading, isError} = useWishes();
  const {
    addWish,
    removeWish,
    checkWish: checkWishMutation,
    editWish,
  } = useWishMutations();

  const isEmpty = wishes.length === 0;

  const handleChangeValue = (key, value) => {
    setFormWish({...formWish, [key]: value});
  };

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const sendWish = async () => {
    if (iDEditing) {
      await editWish.mutateAsync({
        wishId: iDEditing,
        title: formWish?.title,
        description: formWish?.description,
        link: formWish?.link,
      });
    } else {
      await addWish.mutateAsync(formWish);
    }

    setOpenModalNewWish(false);
    setIDEditing(null);
    setFormWish({});
  };

  const deleteWish = async wishId => {
    await removeWish.mutateAsync(wishId);
  };

  const checkWish = async wishId => {
    await checkWishMutation.mutateAsync({wishId, done: true});
  };

  const openModalToEditWish = e => {
    setIDEditing(e.id);
    setFormWish({title: e.title, description: e.description, link: e.link});
    setOpenModalNewWish(true);
  };

  useEffect(() => {
    if (
      addWish.isError ||
      editWish.isError ||
      removeWish.isError ||
      checkWishMutation.isError
    ) {
      Toast.show({
        type: 'error',
        text1: 'Oops 😢',
        text2: 'Hubo un error al guardar los datos.',
      });
    }
  }, [
    addWish.isError,
    editWish.isError,
    removeWish.isError,
    checkWishMutation.isError,
  ]);

  return (
    <>
      <MenuTop handleClose={signOutUser} />
      <ScrollView onScroll={onScroll}>
        <View
          style={{
            paddingTop: 16,
            paddingBottom: 84,
            flex: 1,
          }}>
          {isLoading && <ActivityIndicator />}
          {isEmpty ? (
            <NoItems />
          ) : (
            <>
              {wishes?.map(e => {
                return (
                  <RowCard
                    wishName={e.title}
                    key={e.id}
                    id={e.id}
                    disabled={e.done}
                    onRemove={deleteWish}
                    onCheck={checkWish}
                    onEdit={() => openModalToEditWish(e)}
                  />
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
      <AnimatedFAB
        icon={'plus'}
        label={t('home:new')}
        extended={isExtended}
        onPress={() => setOpenModalNewWish(true)}
        visible={visible}
        animateFrom={'right'}
        style={[styles.homeScreen.fabStyle]}
        color="white"
      />
      <Portal>
        <Dialog
          visible={openModalNewWish}
          onDismiss={() => setOpenModalNewWish(false)}
          theme={{roundness: 2}}
          style={{backgroundColor: '#fff'}}
          dismissable={false}>
          <AddNewWish
            closeAddWishDialog={() => {
              setFormWish({}), setOpenModalNewWish(false);
            }}
            onChangeTitle={text => handleChangeValue('title', text)}
            onChangeDescription={text => handleChangeValue('description', text)}
            onChangeLink={text => handleChangeValue('link', text)}
            handleOnPress={() => sendWish().then(() => setFormWish({}))}
            formData={formWish}
          />
        </Dialog>
      </Portal>
    </>
  );
}

export default HomeScreen;
