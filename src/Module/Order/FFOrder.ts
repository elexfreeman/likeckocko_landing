/**
 * Функции обработки заказа
 */


import { OrderI, OrderProductI } from "./TOrder";
import { TValidator } from '../TValidator';
import * as FCommonOrder from './FCommonOrder';

import * as _ from "lodash";

/**
 * Дефлтный заказ
 */
export const fDefault = (): OrderI => {
    const order: OrderI = {
        city: '',
        delivery_address: '',
        comment: '',
        delivery_date: '',
        delivery_time_comment: '',
        products: [],
    };
    return fSave(order);
}

/**
 * Получить текущий заказ из кэша
 */
export const fGet = () => {
    try {
        const order: OrderI = <OrderI>JSON.parse(localStorage.getItem('order'));
        if (!order) throw 'error localStorage';

        const cV = new TValidator();

        cV.fSetData(order.city)
            .fDefault('');

        cV.fSetData(order.delivery_address)
            .fDefault('');

        cV.fSetData(order.delivery_address)
            .fDefault('');

        cV.fSetData(order.comment)
            .fDefault('');

        cV.fSetData(order.delivery_date)
            .fDefault('');

        cV.fSetData(order.delivery_time_comment)
            .fDefault('');

        cV.fSetData(order.products)
            .fDefault([]);

        return order;

    } catch (e) {
        console.log('Empty order');
    }

    return fDefault();
};

/**
 * сохранить заказ в кэш
 * @param order 
 */
export const fSave = (order: OrderI): OrderI => {
    localStorage.setItem('order', JSON.stringify(order))
    return order;
};

/* ************************** */
/* ф-и измнения */
/* ************************** */

export const fChangeCity =
    (order: OrderI) =>
        (sCity: string): OrderI => {
            order.city = sCity;
            return order;
        };

export const fChangeDeliveryAddress =
    (order: OrderI) =>
        (sDeliveryAddress: string): OrderI => {
            order.delivery_address = sDeliveryAddress;
            return order;
        };

export const fChangeComment =
    (order: OrderI) =>
        (sComment: string): OrderI => {
            order.comment = sComment;
            return order;
        };

export const fChangeDeliveryTimeComment =
    (order: OrderI) =>
        (sDeliveryTimeComment: string): OrderI => {
            order.delivery_time_comment = sDeliveryTimeComment;
            return order;
        };

export const fChangeDeliveryDate =
    (order: OrderI) =>
        (sDeliveryDate: string): OrderI => {
            order.delivery_date = sDeliveryDate;
            return order;
        };

/**
 * Меняет товары в заказе
 * @param order 
 */
export const fChangeProducts =
    (order: OrderI) =>
        (aProducts: OrderProductI[]): OrderI => {
            order.products = aProducts;
            return order;
        };

/**
 * Меняет кол-во у товара в товарах заказа
 * @param aProducts 
 */
export const fChangeProductCountFromProducts =
    (aProducts: OrderProductI[]) =>
        (productId: number) =>
            (nCount: number): OrderProductI[] => {
                const products = aProducts.map(product => {
                    if (product.id == productId) {
                        product.count = nCount;
                    }
                    return product;
                });
                return products;
            }



/* ************************************* */
/* Товары заказа */
/* ************************************* */

/**
 * Получить индекс товара по его ID или -1 если нету
 * @param aProducts 
 */
export const fGetOrderProductIndexById =
    (aProducts: OrderProductI[]) =>
        (productId: number): number =>
            _.findIndex(aProducts, product => (product.product_id == productId));


/**
 * Увеличиваем кол-во 1-го товара в заказе по его ID
 * @param aProducts 
 */
export const fIncrementOrderProductCount =
    (aProducts: OrderProductI[]) => // товары
        (productId: number) => // id товара
            /* инкремент */
            (nIncrement: number): OrderProductI[] => {

                /* получаем индекс товара */
                const nProductIndex = fGetOrderProductIndexById(aProducts)
                    (productId);

                /* если товар есть меняем индекс */
                if (nProductIndex >= 0) {
                    aProducts[nProductIndex].count = aProducts[nProductIndex].count + nIncrement;
                    return aProducts;
                } else {
                    /* если товара нет возвращаем null */
                    return null;
                }

            }

/**
 * Добавить продукт в заказ
 * @param productId 
 */
export const fAddProduct =
    (order: OrderI) =>
        (productId: number) =>
            (sCaption: string) =>
                (nPrice: number) =>
                    (sImg: string): OrderI => {
                        /* Меняет кол-во 1-го товара в заказе по его ID */
                        if (!fIncrementOrderProductCount(order.products)(productId)(+1)) {
                            /* если не удалось изменить кол-во добавляем товар */
                            order.products.push({
                                product_id: productId,
                                caption: sCaption,
                                price: nPrice,
                                count: 1,
                                img: sImg,
                            });
                        }

                        return order;
                    };

/**
 * Удалить товар по его Id
 * @param aProducts 
 */
export const fRemoveProduct =
    (order: OrderI) =>
        (productId: number): OrderI => {
            order.products = _.remove(order.products, product => {
                return (product.product_id != productId)
            });
            return order;
        } // товары
