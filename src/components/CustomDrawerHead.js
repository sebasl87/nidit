import React from 'react';
import {Text, View} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import UserImage from './UserImage';
import {styles} from '../styles/styles';
import {useTranslation} from 'react-i18next';
import { TextInput } from 'react-native-paper';

const CustomDrawerHead = props => {
  const {t} = useTranslation();

  return (
    <DrawerContentScrollView contentContainerStyle={{paddingTop: 0}} {...props}>
      <View style={styles.customDrawerHead.head}>
        <UserImage />
        <View style={styles.customDrawerHead.textContainer}>
          <Text style={styles.customDrawerHead.hello}>
            {t('home:menu.hello')}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {props.user}
          </Text>
        </View>
      </View>
      <View>
        <DrawerItemList {...props} />
        <DrawerItem
          label={t('home:menu.logout')}
           icon={() =>(
            <TextInput.Icon
              icon="gift-off"
              iconColor="#F49037"
            />
          )}
          onPress={() => {
            props.logout();
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerHead;
