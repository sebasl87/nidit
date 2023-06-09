/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { MenuTop, NoItems, RowCard, AddNewWish } from "../components";

import { View, ScrollView } from "react-native";
import { AnimatedFAB, Portal, Dialog } from "react-native-paper";
import mainContext from "../context/mainContext";
import { styles } from "../styles/styles";
import auth from "@react-native-firebase/auth";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_USER_ID } from "../services/apollo/querys/user";
import { NEW_USER_ID } from "../services/apollo/mutations/user";
import {
  DONE_WISH,
  EDIT_WISH,
  NEW_WISH,
  REMOVE_WISH,
} from "../services/apollo/mutations/wish";
import { SUBSCRIPTION_WISHLIST_WITH_ID } from "../services/apollo/querys/wish";
import Toast from 'react-native-toast-message';
import { useTranslation } from "react-i18next";


function HomeScreen({ visible }) {
  const { t } = useTranslation();

  const {
    signOutUser,
    setUserID,
    userID: { userID },
  } = useContext(mainContext);

  const [isExtended, setIsExtended] = useState(true);
  const [iDEditing, setIDEditing] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [wishList, setWishList] = useState(null);
  const [openModalNewWish, setOpenModalNewWish] = useState(false);
  const [formWish, setFormWish] = useState();


  const handleChangeValue = (key, value) => {
    setFormWish({ ...formWish, [key]: value });
  };

  const [addUser, { data: dataNewUser, error: errorNewUser }] =
    useMutation(NEW_USER_ID);

  const [addWish, { data: dataNewWish, error: errorNewWish }] =
    useMutation(NEW_WISH);

  const [editWish, { error: errorEditWish }] = useMutation(EDIT_WISH);

  const [removeWish, { error: errorRemoveWish }] = useMutation(REMOVE_WISH);
  const [doneWish, { error: errorDoneWish }] = useMutation(DONE_WISH);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const uid = auth().currentUser.uid;

  const { data: dataUserID } = useQuery(GET_USER_ID, {
    variables: { user_UID: uid },
  });

  const { data: dataWishList } = useSubscription(
    SUBSCRIPTION_WISHLIST_WITH_ID,
    { variables: { id: userID } }
  );

  useEffect(() => {
    dataWishList && setWishList(dataWishList?.getWishlistUsers?.wishlist);
  }, [dataWishList]);

  useEffect(() => {
    dataNewWish &&
      setWishList(dataNewWish?.updateWishlistUsers.wishlistUsers[0].wishlist);
  }, [dataNewWish]);

  useEffect(() => {
    dataNewUser &&
      setUserID(dataNewUser?.addWishlistUsers.wishlistUsers[0]?.id);
  }, [dataNewUser]);

  useEffect(() => {
    dataUserID && dataUserID.queryWishlistUsers.length === 0 && firstTime
      ? addUser({ variables: { user_UID: uid } }).then(() =>
          setFirstTime(false)
        )
      : setUserID(dataUserID?.queryWishlistUsers[0]?.id);
  }, [dataUserID]);

  useEffect(() => {
    (errorNewUser ||
      errorNewWish ||
      errorEditWish ||
      errorRemoveWish ||
      errorDoneWish) &&
      Toast.show({
        type: "error",
        text1: "❌ Error",
        text2:
          errorNewUser |
          errorNewWish |
          errorEditWish |
          errorRemoveWish |
          errorDoneWish,
      });
  }, [
    errorNewUser,
    errorNewWish,
    errorEditWish,
    errorRemoveWish,
    errorDoneWish,
  ]);

  const sendWish = async () => {
    iDEditing
      ? await editWish({
          variables: {
            id: iDEditing,
            title: formWish?.title,
            description: formWish?.description,
            link: formWish?.link,
          },
        }).then(() => {
          setOpenModalNewWish(false), setIDEditing(null);
        })
      : await addWish({
          variables: {
            id: userID,
            title: formWish?.title,
            description: formWish?.description,
            link: formWish?.link,
          },
        }).then(() => {
          setOpenModalNewWish(false), setIDEditing(null);
        });
  };

  const deleteWish = async (wishId) => {
    await removeWish({
      variables: { id: wishId },
    });
  };

  const checkWish = async (wishId, disabledId) => {
    await doneWish({
      variables: { id: wishId, done: disabledId },
    });
  };

  const openModalToEditWish = (e) => {
    setIDEditing(e.id);
    setFormWish({ title: e.title, description: e.description, link: e.link });
    setOpenModalNewWish(true);
  };
  const isEmpty = wishList === undefined || wishList?.length === 0;

  return (
    <>
      <MenuTop handleClose={signOutUser} />
      <ScrollView onScroll={onScroll}>
        <View
          style={{
            paddingTop: 16,
            paddingBottom: 84,
            flex: 1,
          }}
        >
          {isEmpty ? (
            <NoItems />
          ) : (
            <>
              {wishList?.map((e) => {
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
        // icon={"plus"}
        label={t("home:new")}
        extended={isExtended}
        onPress={() => setOpenModalNewWish(true)}
        visible={visible}
        animateFrom={"right"}
        style={[styles.homeScreen.fabStyle]}
        color="white"
      />
      <Portal>
        <Dialog
          visible={openModalNewWish}
          onDismiss={() => setOpenModalNewWish(false)}
          theme={{ roundness: 2 }}
          style={{ backgroundColor: "#fff" }}
          dismissable={false}
        >
          <AddNewWish
            closeAddWishDialog={() => {
              setFormWish({}), setOpenModalNewWish(false);
            }}
            onChangeTitle={(text) => handleChangeValue("title", text)}
            onChangeDescription={(text) =>
              handleChangeValue("description", text)
            }
            onChangeLink={(text) => handleChangeValue("link", text)}
            handleOnPress={() => sendWish().then(() => setFormWish({}))}
            formData={formWish}
          />
        </Dialog>
      </Portal>
    </>
  );
}

export default HomeScreen;
