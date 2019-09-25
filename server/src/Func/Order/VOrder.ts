import { TValidator } from "../TValidator";


/**
 * Валидатор вставки продукта в заказ
 * @param cValidator 
 */
export const fVOrderProductInsert =
    (cValidator: TValidator) =>
        (orderId: number) =>
            (productId: number) =>
                (price: number) =>
                    async (count: number) => {
                        cValidator
                            .fSetErrorString('orderId')
                            .fSetData(orderId)
                            .fId();

                        cValidator
                            .fSetErrorString('productId')
                            .fSetData(productId)
                            .fId();

                        cValidator
                            .fSetErrorString('price')
                            .fSetData(price)
                            .fExist()
                            .fInt()
                            .fMore(0);

                        cValidator
                            .fSetErrorString('count')
                            .fSetData(count)
                            .fExist()
                            .fInt()
                            .fMore(0);

                        cValidator.fProcess();

                        return true;
                    };


export const fVOrderInsert =
    (cValidator: TValidator) =>
        (userId: number) =>
            (sDeliveryAddress: string) =>
                (sComment: string) =>
                    (sDeliveryDate: string) =>
                        (sDeliveryTimeComment: string) =>
                            async (nTotalprice: number) => {
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
                                    .fSetErrorString('nTotalprice')
                                    .fSetData(nTotalprice)
                                    .fExist()
                                    .fInt();

                                cValidator.fProcess();

                            };                    