import React from "react";
import { View, Image, Text } from "react-native";
import { styles } from "../styles/styles";
import { useTranslation } from "react-i18next";

function NoItems() {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.noItems.divMaster}>
        <View style={styles.noItems.generalContainer}>
          <Image
            source={require("../../assets/emptySpace.png")}
            style={{ width: 90, height: 86, marginTop: 12 }}
          />
          <View style={styles.noItems.containerText}>
            <Text style={styles.noItems.texto}>{t("home:noWishes")}</Text>
            <Text style={styles.noItems.texto}>{t("home:letsgo")}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default NoItems;
