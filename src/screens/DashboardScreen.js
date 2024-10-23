import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSubscription} from '@apollo/client';
import {SUBSCRIPTION_WISHLIST_WITH_ID} from '../services/apollo/querys/wish';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native-paper';
import {RowCard} from '../components';

const DashboardScreen = () => {
  const route = useRoute();
  const {dashboardId} = route.params || {}; // Verificamos que route.params exista

  // const [isOwner, setIsOwner] = useState(false);

  const [wishList, setWishList] = useState(null);

  const {data: dataWishList, loading} = useSubscription(
    SUBSCRIPTION_WISHLIST_WITH_ID,
    {
      variables: {id: dashboardId},
    },
  );


  useEffect(() => {
    dataWishList && setWishList(dataWishList?.getWishlistUsers?.wishlist);
  }, [dataWishList]);

  return (
    <ScrollView>
      <View
        style={{
          paddingTop: 16,
          paddingBottom: 84,
          flex: 1,
        }}>
        {loading && <ActivityIndicator />}
        <>
          {wishList?.map(e => {
            return (
              <RowCard
                wishName={e.title}
                key={e.id}
                id={e.id}
                disabled={e.done}
              />
            );
          })}
        </>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
