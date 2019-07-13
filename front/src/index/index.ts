import Vue from 'vue';

import toCard from "./components/toCard.vue";
import store from './index_vuex';
import Card from './Card';

var buttons = document.querySelectorAll(".cart-button");
let card = new Card();

store.commit('setCard',card);


for (let i = 0; i < buttons.length; i++) {
  buttons[i].setAttribute('id', 'b_' + i);
}

setTimeout(() => {

  for (let i = 0; i < buttons.length; i++) {
    console.log({
      product_id: buttons[i].getAttribute('product_id'),
      product_caption: buttons[i].getAttribute('product_caption'),
      product_price: buttons[i].getAttribute('product_price'),
    });
    new Vue({
      el: '#b_' + i,
      data: {
        product_id: buttons[i].getAttribute('product_id'),
        product_caption: buttons[i].getAttribute('product_caption'),
        product_price: buttons[i].getAttribute('product_price'),
      },
      store: store,
      render: h => h(toCard)
    });    
  }
});
