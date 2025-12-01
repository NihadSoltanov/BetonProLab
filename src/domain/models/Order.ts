import { Delivery } from './Delivery';

export interface Order {
    order: OrderDto[];
    count: number;
    next0ffset: number;
}

export interface OrderDto {
    order_id: string;
    product: string;
    customer: string;
    amount: number | string;
    delivery_data: string;
    delivery_address: string;
    status: number | string;
    delivery_interval: number | string;
    latitude?: number | string;
    longitude?: number | string;
    plant_id: string;
    delivery: Delivery[];
}

export interface OrdersCount {
    ongoing_orders_count: number;
    order_history_count: number;
}
