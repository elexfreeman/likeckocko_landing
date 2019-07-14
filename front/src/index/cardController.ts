import Card from './Card';
import store from './index_vuex';

export default class CardController {

    public card: Card;

    constructor() {
        this.card = Card.Init();
        store.commit("setCard", this.card);
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


