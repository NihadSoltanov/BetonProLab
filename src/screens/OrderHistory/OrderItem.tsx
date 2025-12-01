import React, { memo } from 'react';
import { OrderCard } from 'src/components/OrderCard';
import { OrderDto } from 'src/domain/models/Order';
import { useTranslate } from 'src/i18n/useTranslate';

const OrderItem = ({ item, plantId }: { item: OrderDto; plantId: string }) => {
    const { t } = useTranslate();
    //console.log(item);
    return (
        <>
            {item && (
                <OrderCard
                    isOngoingOrder={false}
                    plantId={plantId}
                    order={item}
                    customer={item?.customer}
                    order_id={item?.order_id}
                    product={item?.product}
                    amount={item?.amount}
                    delivery_data={item?.delivery_data}
                    delivery_address={item?.delivery_address}
                    status={item?.status}
                    delivery_interval={item?.delivery_interval}
                    latitude={item?.latitude}
                    longitude={item?.longitude}
                    plant_id={item?.plant_id}
                    delivery={item?.delivery}
                    leftButtonText={t('slump')}
                    rightButtonText={t('strength')}
                    middleButtonText={t('freeze')}
                    newLength={35}></OrderCard>
            )}
        </>
    );
};

export default memo(OrderItem);
