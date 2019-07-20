import { Card } from '../objects/Card';
import store from './index_vuex';
import { User } from '../objects/User';

export default class CardController {

    public card: Card;
    public user: User;

    constructor() {
        this.card = store.state.card;
        this.user = store.state.user;
    }

    /**
     * Добавить в корзину
     * @param data 
     */
    onAddCard(data) {

        this.card.add({
            id: parseInt(data.product_id),
            caption: data.product_caption,
            price: parseFloat(data.product_price),
            img: data.product_img,
            count: 1
        });
        
        store.commit("setCard", this.card);
        store.commit("setShowMsgModal", 'Товар добавлен в корзину');
        setTimeout(() => {
            store.commit("setShowMsgModal", null);
        }, 1000);

    }


    onShowCard() {
        store.commit("setShowCard", true);
    }

    onHideCard() {
        store.commit("setShowCard", false);
    }

}


