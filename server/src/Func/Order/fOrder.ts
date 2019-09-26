import * as TFOrder from "./TOrder";
import { db } from "../Sys/DBConnect";

export const fOrderProductTable = () => 'order_product';
export const fOrderTable = () => 'orders';

/**
 * Создать заказ
 * @param order: TFOrder.OrderI 
 */
export const fMakeOrder: TFOrder.TMakeOrder =
    async (order: TFOrder.OrderI) => {
        /* Вставляем заказ */
        const orderId = await faOrderInsert(order.user_id)
            (order.delivery_address)
            (order.comment)
            (order.delivery_date)
            (order.delivery_time_comment)
            (order.products //высчитываем общую сумму
                .map(product =>
                    product.count * product.price) // массив цены за товар
                .reduce((previousValue, currentValue) =>
                    previousValue + currentValue)); // складываем

        /* Вставляем товары заказа */
        order.products.forEach(async (product: TFOrder.OrderProductI) =>
            await faOrderProductInsert(orderId)
                (product.product_id)
                (product.price)
                (product.count)
        );

        return orderId;
    };

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

