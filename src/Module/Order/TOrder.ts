import { TValidator } from "../TValidator";
import { TCheckUserExist } from "../User/TUser";


export interface OrderProductI {
    id?: number;
    count?: number;
    order_id?: number;
    price?: number;
    product_id?: number;
    caption?: string;
    img?: string;
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
    (userId: number) =>
        (order: OrderI) =>
            (fCalcTotalSumm: TCalcOrderTotalSumm) =>
                Promise<number>;

export type TOrderInsert =
    (userId: number) =>
        (sDeliveryAddress: string) =>
            (sComment: string) =>
                (sDeliveryDate: string) =>
                    (sDeliveryTimeComment: string) =>
                        (nTotalPrice: number) => Promise<number>;

export type TOrderProductInsert =
    (orderId: number) =>
        (productId: number) =>
            (price: number) =>
                (count: number) => Promise<number>;

export type TCalcOrderTotalSumm =
    (aProducts: OrderProductI[]) => number           