/* eslint-disable */
import React, { useState } from "react";
import { View, Image, Text, TouchableHighlight } from "react-native";
import { Menu, Dialog, Portal, Button } from "react-native-paper";
import { styles } from "../styles/styles";
import { useTranslation } from "react-i18next";

function RowCard({ wishName, disabled, id, onRemove, onCheck, onEdit }) {
  const [visible, setVisible] = useState(false);
  const [viewDialog, setDialog] = useState(false);
  const handleClick = () => {
    setDialog(true);
    setVisible(false);
  };
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.rowCard.generalDiv}>
        <View
          style={{
            width: "100%",
            height: 54,
            backgroundColor: disabled
              ? "transparent"
              : "rgba(255, 255, 255, 0.5)",
            borderRadius: 6,
            borderColor: "rgba(0, 0, 0, 0.5)",
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 1,
            alignItems: "center",
            paddingRight: 40,
          }}
        >
          <View style={styles.rowCard.generalText}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#000",
                textDecorationLine: disabled ? "line-through" : "none",
                textDecorationColor: disabled && "#000",
              }}
            >
              {wishName}
            </Text>
          </View>
          <View style={styles.rowCard.containerMenu}>
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <TouchableHighlight
                  onPress={() => setVisible(true)}
                  hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                  style={styles.rowCard.plusIconView}
                  activeOpacity={0.6}
                  underlayColor="transparent"
                >
                  <Image
                    source={require("../../assets/tableIcon.png")}
                    style={{
                      width: 36,
                      height: 36,
                      tintColor: "rgba(0, 0, 0, 0.8)",
                    }}
                  />
                </TouchableHighlight>
              }
              statusBarHeight={36}
              theme={{ roundness: 16 }}
              style={{ width: 110 }}
            >
              <Menu.Item
                onPress={() => {
                  setVisible(false), onEdit();
                }}
                title="Editar"
                titleStyle={{ color: "rgba(0, 0, 0, 0.8)", fontSize: 16 }}
              />
              <Menu.Item
                onPress={handleClick}
                title="Eliminar"
                titleStyle={{ color: "rgba(0, 0, 0, 0.8)", fontSize: 16 }}
              />
              <Menu.Item
                onPress={() => onCheck(id, !disabled)}
                title={disabled ? "Desmarcar" : "Marcar"}
                titleStyle={{ color: "rgba(0, 0, 0, 0.8)", fontSize: 16 }}
              />
            </Menu>
          </View>
        </View>
        <Portal>
          <Dialog
            visible={viewDialog}
            onDismiss={() => setDialog(false)}
            theme={{ roundness: 2 }}
            style={{ backgroundColor: "#fff" }}
          >
            <Text style={styles.rowCard.dialogText}>
              {t("home:removeWish")}
            </Text>
            <View style={styles.rowCard.dialogButtonContainer}>
              <Button
                buttonColor="rgba(245, 176, 66, 1)"
                onPress={() => setDialog(false)}
                textColor="#fff"
                style={[
                  styles.rowCard.dialogButton,
                  styles.rowCard.dialogFirstButton,
                ]}
              >
                {t("home:newWish.cancel")}
              </Button>
              <Button
                buttonColor="rgba(245, 176, 66, 1)"
                onPress={() => (onRemove(id), setDialog(false))}
                textColor="#fff"
                style={styles.rowCard.dialogButton}
              >
                {t("home:newWish.ok")}
              </Button>
            </View>
          </Dialog>
        </Portal>
      </View>
    </>
  );
}

export default RowCard;
