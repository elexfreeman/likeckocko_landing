import * as FFOrder from './FFOrder';
import * as FCommonOrder from './FCommonOrder';
import * as OrderAPI from "./OrderAPI";
import { CheckoutRespI } from '../Sys/ReqI/OrderR';
import { OrderProductI, OrderI } from './TOrder';
import { compose } from '../Sys/SFunc';
import { FBaseController } from '../Sys/FBaseController';
/**
 * Оформление заказа
 */
export class OrderController extends FBaseController {

    /**
     * Событие сохранения состояния корхины
     * @param order 
     */
    public onSaveCart(order: OrderI) {
        this.store.commit("setOrder", order);
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
        this.store.commit("setOrder", FFOrder.fGet());
        this.store.commit("setTotalPrice", this.fCalcOrderTotalSumm());

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
        this.store.commit("setOrder", FFOrder.fGet());
        this.store.commit("setTotalPrice", this.fCalcOrderTotalSumm());

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
        this.store.commit("setOrder", order);
        this.store.commit("setTotalPrice", this.fCalcOrderTotalSumm());

        /* показываем сообщение */
        this.store.commit("setShowMsgModal", 'Товар добавлен в корзину');
        setTimeout(() => {
            /* скрываем сообщение */
            this.store.commit("setShowMsgModal", null);
        }, 1000);

    }


    /**
     * Показать корзину
     */
    public onShowCart() {
        this.store.commit("setShowCart", true);
    }

    /**
     * Скрыть корзину
     */
    public onHideCart() {
        this.store.commit("setShowCart", false);
    }

    /**
     * Офрмить заказ
     */
    public async checkout() {

        this.store.commit('setOnLoad', true);
        this.store.commit('setCartFormError', false);

        const resp: CheckoutRespI = await OrderAPI
            .fCheckout(this.store.state.user)
            (this.store.state.order);

        this.store.commit('setCartErrors', resp.errors);

        if (resp.ok) {

            this.store.commit('setOnLoad', false);
            this.onHideCart();

            this.store.commit('setShowMsgModal', 'Спасибо за оформление заказа');
            setTimeout(() => {
                this.store.commit('setShowMsgModal', null);
            }, 4000)

        } else {
            this.store.commit('setCartFormError', true);
        }

    }

    /**
     * Общая сумма заказа
     */
    public fCalcOrderTotalSumm(): number {
        return FCommonOrder.fCalcOrderTotalSumm(FFOrder.fGet().products);
    }

}


