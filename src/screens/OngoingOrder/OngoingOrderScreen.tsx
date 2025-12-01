import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import styles from "./OngoingOrderScreen.styles";
import { Order, OrderDto } from "src/domain/models/Order";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { ScreenBackground } from "src/components/ScreenBackground";
import { useTranslate } from "src/i18n/useTranslate";
import { useOngoingOrders, useOrdersCount } from "src/data/querys/orderQueries";
import OrderItem from "./OrderItem";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useAuth } from "src/contexts/Auth";

type ParamList = {
  OngoingOrder: {
      plant_id:string
  };
};

export const OngoingOrderScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'OngoingOrder'>>();
  const { t } = useTranslate();
  const { signOut } = useAuth();
  const orderCounts = useOrdersCount(route.params.plant_id);
  const { isSuccess,isLoading, data, hasNextPage,isFetching, fetchNextPage, isFetchingNextPage, error}= 
  useOngoingOrders(route.params.plant_id,orderCounts.data?.ongoing_orders_count??Infinity);
  
 useEffect(() => {
   if(data?.pages){
   if(data?.pages[0].order===undefined){
    signOut();
   }
   }
 }, [data])
 
 //}

  const loadMore = () => {
    if (hasNextPage) {
      !isFetching && fetchNextPage();
    }
  };
  const ordersList= ({ item }: { item: OrderDto }): ReactElement => {
    return <OrderItem item={item} plantId={route.params.plant_id}/>
}

return  (
        <ScreenBackground screenTitle={t('ORDER_TRACKING')} isVisible={false}>
             {isLoading && <ActivityIndicator size="large" />}
             {isSuccess && (
            <FlatList
                style={styles.container}
                data={data?.pages?.map(page => page?.order??[])?.flat()??[]}
                onEndReached={loadMore}
                onEndReachedThreshold={0.3}
                ListFooterComponent={
                isFetchingNextPage ? (
              <View style={styles.footerContainer}>
                <ActivityIndicator size="large" />
              </View>
            ) : null
          }
                keyExtractor={item => item?.order_id?.toString()}
                renderItem={ordersList}
                ListEmptyComponent={()=>!data?.pages.map(page => page.order).flat().length ? (
                  <View style={styles.emptyMessageContainer}>
                    <Text style={styles.emptyMessage}>{t('orders.empty')}</Text>
                  </View>
                ) : null
              }
                />)}
        </ScreenBackground>
        
    );
};
