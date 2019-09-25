import * as TFOrder from "./TOrder";
import * as TFUser from "../TUser";
import * as fTUser from "../fUser";
import { TValidator } from "../TValidator";
import { db } from "../Sys/DBConnect";
import * as VOrder from "./VOrder";


export const fOrderProductTable = () => 'order_product';

/**
 * Создать заказ
 * @param checkUser 
 */
export const fMakeOrder: TFOrder.TMakeOrder =
    (cValidator: TValidator) =>
        async (order: TFOrder.OrderI) => {
            /* проверяем кол-во прдуктов */
            cValidator
                .fSetErrorString('emptyProducts')
                .fSetData(order.products)
                .fMinLen(1);
            cValidator.fProcess();

            const orderId = await faOrderInsert(cValidator)
                (order.user_id)
                (order.delivery_address)
                (order.comment)
                (order.delivery_date)
                (order.delivery_time_comment)
                (0);

            order.products.forEach(async (product: TFOrder.OrderProductI) =>
                await cValidator.faDoIfOkAsync(async () =>
                    await faOrderProductInsert(new TValidator)
                        (orderId)
                        (product.product_id)
                        (product.price)
                        (product.count)
                )
            );

            /* for (let i = 0; i < order.products.length; i++) {
                await faOrderProductInsert(cValidator)
                    (orderId)
                    (order.products[i].product_id)
                    (order.products[i].price)
                    (order.products[i].count)
            } */


            return orderId;
        };

/**
 * Вставить заказ
 * @param userId 
 */
export const faOrderInsert: TFOrder.TOrderInsert =
    (cValidator: TValidator) =>
        (userId: number) =>
            (sDeliveryAddress: string) =>
                (sComment: string) =>
                    (sDeliveryDate: string) =>
                        (sDeliveryTimeComment: string) =>
                            async (nTotalprice: number) => {
                                VOrder.fVOrderInsert(cValidator)
                                    (userId)
                                    (sDeliveryAddress)
                                    (sComment)
                                    (sDeliveryDate)
                                    (sDeliveryTimeComment)
                                    (nTotalprice);

                                return (await db(fOrderProductTable())
                                    .insert({
                                        user_id: userId,
                                        delivery_address: sDeliveryAddress,
                                        comment: sComment,
                                        delivery_date: sDeliveryDate,
                                        delivery_time_comment: sDeliveryTimeComment,
                                        total_price: nTotalprice,
                                    }))[0];
                            };

/**
 * Вставить продукт заказа
 * @param orderId 
 */
export const faOrderProductInsert: TFOrder.TOrderProductInsert =
    (cValidator: TValidator) =>
        (orderId: number) =>
            (productId: number) =>
                (nPrice: number) =>
                    async (nCount: number) => {
                        VOrder.fVOrderProductInsert(cValidator)
                            (orderId)
                            (productId)
                            (nPrice)
                            (nCount);

                        return (await db(fOrderProductTable())
                            .insert({
                                order_Id: orderId,
                                product_id: productId,
                                price: nPrice,
                                count: nCount,
                            }))[0];

                    };
