import Vue from 'vue';

import msgModal from "./components/msgModal.vue";

import ToCart from "../../Module/Order/Components/ToCart.vue";
import Cart from "../../Module/Order/Components/Cart.vue";
import CartPage from "../../Module/Order/Components/CartPage.vue";

import store from './AppVuex';

const run = () => {

    const buttons = document.querySelectorAll(".card-button");

    /* Установка кнопок в корзину */
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('id', 'b_' + i);
    }



    for (let i = 0; i < buttons.length; i++) {
        new Vue({
            el: '#b_' + i,
            data: {
                product_id: buttons[i].getAttribute('product_id'),
                product_caption: buttons[i].getAttribute('product_caption'),
                product_price: buttons[i].getAttribute('product_price'),
                product_img: buttons[i].getAttribute('product_img'),
            },
            store: store,
            render: h => h(ToCart)
        });
    }



    new Vue({
        el: '#msg_modal',
        data: {},
        store: store,
        render: h => h(msgModal)
    });

    new Vue({
        el: '#cart',
        data: {},
        store: store,
        render: h => h(Cart)
    });




    let cart_page = document.getElementById('cart_page');
    if (cart_page) {

        new Vue({
            el: '#cart_page',
            data: {},
            store: store,
            render: h => h(CartPage)
        });
    }

}

document.addEventListener("DOMContentLoaded", run);
