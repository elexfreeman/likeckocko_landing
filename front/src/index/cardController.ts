import Card from './Card';
import store from './index_vuex';

export default class CardController {

    /**
     * Добавить в корзину
     * @param data 
     */
    onAddCard(data) {
        
        let card = new Card();
        card.products = store.state.products;
        card.add({
          id: data.product_id,
          caption: data.product_caption,
          price: data.product_price,
          img: data.product_img,
          count: 1
        });
        store.commit("setCard", card);
        store.commit("setShowMsgModal", 'Товар добавлен в корзину');
        setTimeout(()=>{
            store.commit("setShowMsgModal", null);
        }, 2000);
        
    }

}