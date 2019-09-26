import * as TFOrder from "./TOrder";
import { db } from "../Sys/DBConnect";

import * as SFunc from "../Sys/SFunc";
export const fOrderProductTable = () => 'order_product';
export const fOrderTable = () => 'orders';

/**
 * Создать заказ
 */
export const fMakeOrder: TFOrder.TMakeOrder =
    // заказ, провализированный
    (order: TFOrder.OrderI) =>
        // ф-я подсчета суммы заказа
        async (fCalcTotalSumm: TFOrder.TCalcOrderTotalSumm) => {
            /* Вставляем заказ */
            const orderId = await faOrderInsert(order.user_id)
                (order.delivery_address)
                (order.comment)
                (order.delivery_date)
                (order.delivery_time_comment)
                (fCalcTotalSumm(order.products)); // складываем

            /* частичное применение функции (для примера)  */
            const faInsertProductForOrder = faOrderProductInsert(orderId);

            /* Вставляем товары заказа */
            order.products.forEach(async (product: TFOrder.OrderProductI) =>
                await faInsertProductForOrder(product.product_id)
                    (product.price)
                    (product.count)
            );

            return orderId;
        };


export const fCalcOrderTotalSumm =
    (aProducts: TFOrder.OrderProductI[]) =>
        aProducts.map(product => product.count * product.price)
            .reduce(SFunc.fSum); // массив цены за товар


/**
 * Вставить заказ
 * @param userId 
 */
export const faOrderInsert: TFOrder.TOrderInsert =
    (userId: number) =>
        (sDeliveryAddress: string) =>
            (sComment: string) =>
                (sDeliveryDate: string) =>
                    (sDeliveryTimeComment: string) =>
                        async (nTotalprice: number) =>
                            (await db(fOrderTable())
                                .insert({
                                    user_id: userId,
                                    delivery_address: sDeliveryAddress,
                                    comment: sComment,
                                    delivery_date: sDeliveryDate,
                                    delivery_time_comment: sDeliveryTimeComment,
                                    total_price: nTotalprice,
                                }))[0];


/**
 * Вставить продукт заказа
 * @param orderId 
 */
export const faOrderProductInsert: TFOrder.TOrderProductInsert =
    (orderId: number) =>
        (productId: number) =>
            (nPrice: number) =>
                async (nCount: number) =>
                    (await db(fOrderProductTable())
                        .insert({
                            order_Id: orderId,
                            product_id: productId,
                            price: nPrice,
                            count: nCount,
                        }))[0];



export const faGetUserOrders = 
    async (userId: number) => {
        return (await db(fOrderTable()).where('user_id', userId))
    }
                