import store from './index_vuex';
import { Order } from '../objects/Order';


export default class CardController {

    /**
    * Добавить в корзину
    * @param data 
    */
    public onAddCard(data) {

        let card = store.state.card;

        card.add({
            id: parseInt(data.product_id),
            caption: data.product_caption,
            price: parseFloat(data.product_price),
            img: data.product_img,
            count: 1
        });

        store.commit("setCard", card);
        store.commit("setShowMsgModal", 'Товар добавлен в корзину');
        setTimeout(() => {
            store.commit("setShowMsgModal", null);
        }, 1000);

    }


    /**
     * Показать корзину
     */
    public onShowCard() {
        store.commit("setShowCard", true);
    }

    /**
     * Скрыть корзину
     */
    public onHideCard() {
        store.commit("setShowCard", false);
    }

    /**
     * Офрмить заказ
     */
    public async checkout() {
        let card = store.state.card;
        let user = store.state.user;

        let order = new Order(user, card);

        let resp = await order.Checkout();

    }



}


