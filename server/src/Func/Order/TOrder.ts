import { TValidator } from "../TValidator";


export interface OrderProductI {
    id?: number;
    count?: number;
    order_id?: number;
    price?: number;
    product_id?: number;
}

export interface OrderI {
    id?: number;
    user_id?: number;
    city?: string;
    delivery_address?: string;
    comment?: string;
    delivery_date?: string;
    delivery_time_comment?: string;
    create_at?: string;
    products?: OrderProductI[];
}

export type TMakeOrder =
    (cValidator: TValidator) =>
        (order: OrderI) => Promise<number>;

export type TOrderInsert =
    (cValidator: TValidator) =>
        (userId: number) =>
            (sDeliveryAddress: string) =>
                (sComment: string) =>
                    (sDeliveryDate: string) =>
                        (sDeliveryTimeComment: string) =>
                            (nTotalPrice: number) => Promise<number>;

export type TOrderProductInsert =
    (cValidator: TValidator) =>
        (orderId: number) =>
            (productId: number) =>
                (price: number) =>
                    (count: number) => Promise<number>;