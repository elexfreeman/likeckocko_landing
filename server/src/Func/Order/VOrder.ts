import * as TFOrder from "./TOrder";

import { TValidator } from "../TValidator";

export const errorSample = {
    "userId": {
        "isNotExist": false,
        "isNotInt": false,
        "isNotMoreThan": false,
    },
    "sDeliveryAddress": {
        "isNotExist": false,
        "isNotText": false,
        "lessThanMinLen": false,
    },
    "sComment": {
        "isNotExist": false,
        "isNotText": false,
    },
    "sDeliveryDate": {
        "isNotExist": false,
        "isNotText": false,
    },
    "sDeliveryTimeComment": {
        "isNotExist": false,
        "isNotText": false,
    },
    "nTotalprice": {
        "isNotExist": false,
        "isNotInt": false,
    },
    "orderId.0": {
        "isNotExist": false,
        "isNotInt": false,
        "isNotMoreThan": false,
    },
    "productId.0": {
        "isNotExist": false,
        "isNotInt": false,
        "isNotMoreThan": false,
    },
    "price.0": {
        "isNotExist": false,
        "isNotInt": false,
        "isNotMoreThan": false,
    },
    "count.0": {
        "isNotExist": false,
        "isNotInt": false,
        "isNotMoreThan": false,
    },

}

export const fVMakeOrder =
    (cValidator: TValidator) =>
        (order: TFOrder.OrderI) => {
            fVOrderInsert(cValidator)
                (order.user_id)
                (order.delivery_address)
                (order.comment)
                (order.delivery_date)
                (order.delivery_time_comment)
                (order.products);

            cValidator.fDoIfOk(
                () => order.products.forEach((product, key) =>
                    fVOrderProductInsert(cValidator)
                        (key)
                        (product.product_id)
                        (product.price)
                        (product.count)
                )
            );

            return cValidator.fIsOk();
        }


/**
 * Валидатор вставки продукта в заказ
 * @param cValidator 
 */
export const fVOrderProductInsert =
    (cValidator: TValidator) =>
        (insertCounter: number) =>
            (productId: number) =>
                (price: number) =>
                    (count: number) => {

                        cValidator
                            .fSetErrorString('productId.' + insertCounter)
                            .fSetData(productId)
                            .fId();

                        cValidator
                            .fSetErrorString('price.' + insertCounter)
                            .fSetData(price)
                            .fExist()
                            .fInt()
                            .fMore(0);

                        cValidator
                            .fSetErrorString('count.' + insertCounter)
                            .fSetData(count)
                            .fExist()
                            .fInt()
                            .fMore(0);

                        return cValidator.fIsOk();
                    };


export const fVOrderInsert =
    (cValidator: TValidator) =>
        (userId: number) =>
            (sDeliveryAddress: string) =>
                (sComment: string) =>
                    (sDeliveryDate: string) =>
                        (sDeliveryTimeComment: string) =>
                            (aProducts: TFOrder.OrderProductI[]) => {
                                cValidator
                                    .fSetErrorString('userId')
                                    .fSetData(userId)
                                    .fId();

                                cValidator
                                    .fSetErrorString('sDeliveryAddress')
                                    .fSetData(sDeliveryAddress)
                                    .fExist()
                                    .fText()
                                    .fMinLen(5);

                                cValidator
                                    .fSetErrorString('sComment')
                                    .fSetData(sComment)
                                    .fExist()
                                    .fText();

                                cValidator
                                    .fSetErrorString('sDeliveryDate')
                                    .fSetData(sDeliveryDate)
                                    .fExist()
                                    .fText();

                                cValidator
                                    .fSetErrorString('sDeliveryTimeComment')
                                    .fSetData(sDeliveryTimeComment)
                                    .fExist()
                                    .fText();

                                cValidator
                                    .fSetErrorString('aProducts')
                                    .fSetData(aProducts)
                                    .fExist()

                                return cValidator.fIsOk();

                            };                    