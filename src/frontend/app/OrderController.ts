import store from './AppVuex';
import * as FFOrder from '../../Func/Order/FFOrder';
import * as FCommonOrder from '../../Func/Order/FCommonOrder';
import * as OrderAPI from "./OrderAPI";
import { CheckoutRespI } from '../../Func/Sys/ReqI/OrderR';
import { OrderProductI, OrderI } from '../../Func/Order/TOrder';
import { compose } from '../../Func/Sys/SFunc';
/**
 * Оформление заказа
 */
export class OrderController {

    /**
     * Событие сохранения состояния корхины
     * @param order 
     */
    public onSaveCart(order: OrderI) {
        store.commit("setOrder", order);
        FFOrder.fSave(order);
    }

    /**
     * Инкремент товара в корзине
     * @param product 
     * @param nInc 
     */
    public countInc(product: OrderProductI, nInc: number) {

        /* инкремент для vuex */
        product.count = product.count + nInc;

        /* данные из кэша */
        const order = FFOrder.fGet();

        /* инкремент в кэше */
        const products = FFOrder.fIncrementOrderProductCount(order.products)
            (product.product_id)(nInc);

        /* сохраняем новый кэш */
        compose(FFOrder.fSave, FFOrder.fChangeProducts(order))(products);

        /* сохраняем vuex */
        store.commit("setOrder", FFOrder.fGet());
        store.commit("setTotalPrice", this.fCalcOrderTotalSumm());

    }

    /**
     * Удалить товар из корзины
     * @param product 
     */
    public fRemoveProduct(product: OrderProductI) {
        console.log('fRemoveProduct');
        
        /* данные из кэша */
        const order = FFOrder.fGet();
        compose(FFOrder.fSave, FFOrder.fRemoveProduct(order))(product.product_id);
        
        /* сохраняем vuex */
        store.commit("setOrder", FFOrder.fGet());
        store.commit("setTotalPrice", this.fCalcOrderTotalSumm());

    }

    /**
    * Добавить в корзину
    * @param data 
    */
    public onAddCart(data: any): void {

        /* меняем данные из кэша */
        const order = FFOrder.fAddProduct(FFOrder.fGet())
            (data.product_id)
            (data.product_caption)
            (parseFloat(data.product_price))
            (data.product_img);

        /* сохраняем новый кэш */
        FFOrder.fSave(order);

        /* сохраняем vuex */
        store.commit("setOrder", order);
        store.commit("setTotalPrice", this.fCalcOrderTotalSumm());

        /* показываем сообщение */
        store.commit("setShowMsgModal", 'Товар добавлен в корзину');
        setTimeout(() => {
            /* скрываем сообщение */
            store.commit("setShowMsgModal", null);
        }, 1000);

    }


    /**
     * Показать корзину
     */
    public onShowCart() {
        store.commit("setShowCart", true);
    }

    /**
     * Скрыть корзину
     */
    public onHideCart() {
        store.commit("setShowCart", false);
    }

    /**
     * Офрмить заказ
     */
    public async checkout() {

        store.commit('setOnLoad', true);
        store.commit('setCartFormError', false);

        const resp: CheckoutRespI = await OrderAPI
            .fCheckout(store.state.user)
            (store.state.order);

        store.commit('setCartErrors', resp.errors);

        if (resp.ok) {

            store.commit('setOnLoad', false);
            this.onHideCart();

            store.commit('setShowMsgModal', 'Спасибо за оформление заказа');
            setTimeout(() => {
                store.commit('setShowMsgModal', null);
            }, 4000)

        } else {
            store.commit('setCartFormError', true);
        }

    }

    /**
     * Общая сумма заказа
     */
    public fCalcOrderTotalSumm(): number {
        return FCommonOrder.fCalcOrderTotalSumm(FFOrder.fGet().products);
    }

}


