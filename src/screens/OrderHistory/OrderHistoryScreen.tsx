import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { OrderDto } from 'src/domain/models/Order';
import { ScreenBackground } from 'src/components/ScreenBackground';
import styles from './OrderHistory.styles';
import { useTranslate } from 'src/i18n/useTranslate';
import { useOrdersCount, useOrdersHistory } from 'src/data/querys/orderQueries';
import OrderItem from './OrderItem';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FilterContext } from 'src/contexts/Filter';
import { useAuth } from 'src/contexts/Auth';

type ParamList = {
    OrderHistory: {
        plant_id: string;
    };
};

export const OrderHistoryScreen: FC = () => {
    const { t } = useTranslate();
    const {filterData} = useContext(FilterContext);
    const route = useRoute<RouteProp<ParamList, 'OrderHistory'>>();
    const orderCounts = useOrdersCount(route.params.plant_id);
    const { signOut } = useAuth();
    const {
        isSuccess,
        isLoading,
        data,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useOrdersHistory(
        route.params.plant_id,
        orderCounts.data?.order_history_count ?? Infinity,filterData?.period!,filterData?.waybill!,filterData?.client!
    );

    useEffect(() => {
        if(data?.pages){
        if(data?.pages[0].order===undefined){
         signOut();
        }
        }
      }, [data]);


    const ordersList = ({ item }: { item: OrderDto }): ReactElement => {
        return <OrderItem item={item} plantId={route.params.plant_id} />;
    };

    const loadMore = () => {
        if (hasNextPage) {
            !isFetching && fetchNextPage();
        }
    };
    return (
        <ScreenBackground screenTitle={t('ORDER_HISTORY')} isVisible={true}>
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
                />
            )}
        </ScreenBackground>
    );
};
