import { AxiosError } from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { axios } from 'src/api/axios-lib';
import { Order, OrderDto, OrdersCount } from 'src/domain/models/Order';

import { OrderTransLab } from 'src/domain/models/OrderTransLab';

const pageSize = 50;
const getOrderHistory = async (
    plant_id: string,
    page: number,
    date: string,
    waybill: string,
    client: string,
): Promise<Order> => {
    const result = await axios.get('getOrdersHistory', {
        params: {
            plant_id: plant_id,
            limit: pageSize,
            offset: page,
            date: date,
            waybill: waybill,
            client: client,
        },
    });
    return { ...(result.data ?? []), next0ffset: page };
};

const getOngoingOrders = async (
    plant_id: string,
    page: number,
): Promise<Order> => {
    const result = await axios.get(
        'getOngoingOrders&plant_id=' +
            plant_id +
            '&limit=' +
            pageSize +
            '&offset=' +
            page,
    );
    return { ...result.data, next0ffset: page };
};

const getOrderTranspLab = (
    plant_id: string,
    delivery_id: string,
): Promise<OrderTransLab> =>
    axios
        .get('getOrderTranspLab', {
            params: { plant_id: plant_id, delivery_id: delivery_id },
        })
        .then(response => response.data);

const getOrder = (plant_id: string, order_id: string): Promise<OrderDto> =>
    axios
        .get('getOrder&plant_id=' + plant_id + '&order_id=' + order_id)
        .then(response => response.data);

const getOrdersCount = (plant_id: string): Promise<OrdersCount> =>
    axios
        .get('getOrdersCount&plant_id=' + plant_id)
        .then(response => response.data);

const useOrdersCount = (plant_id: string) => {
    return useQuery({
        queryKey: ['ordersCount', plant_id],
        queryFn: () => getOrdersCount(plant_id),
    });
};

const useOrdersHistory = (
    plant_id: string,
    totalCount: number,
    date: string,
    waybill: string,
    client: string,
) => {
    return useInfiniteQuery({
        queryKey: ['orderHistory', plant_id, date, waybill, client],
        queryFn: ({ pageParam = 0 }) =>
            getOrderHistory(plant_id, pageParam, date, waybill, client),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.next0ffset + pageSize > 1) {
                return false;
            }

            return lastPage.next0ffset + pageSize;
        },
    });
};

const useOngoingOrders = (plant_id: string, totalCount: number) => {
    return useInfiniteQuery({
        queryKey: ['orderTracking', plant_id],
        queryFn: ({ pageParam = 0 }) => getOngoingOrders(plant_id, pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.next0ffset + pageSize > totalCount) {
                return false;
            }
            return lastPage.next0ffset + pageSize;
        },
    });
};

export {
    useOrdersHistory,
    useOngoingOrders,
    getOrderTranspLab,
    getOrder,
    getOrdersCount,
    useOrdersCount,
};
