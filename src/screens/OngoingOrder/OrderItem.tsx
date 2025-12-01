import { memo } from 'react';
import { OrderCard } from 'src/components/OrderCard';
import { OrderDto } from 'src/domain/models/Order';
import { useTranslate } from 'src/i18n/useTranslate';

const OrderItem = ({ item, plantId }: { item: OrderDto; plantId: string }) => {
    const { t } = useTranslate();
    return (
        <>
        {
            item && (
            <OrderCard
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
                newLength={35}
                isOngoingOrder={true}
            />)
        }
        </>
    );
};

export default memo(OrderItem);
