import Vue from 'vue';
import Vuex from 'vuex';
import { Card } from '../objects/Card';
import { User } from '../objects/User';
import { Order } from '../objects/Order';
declare var window;
Vue.use(Vuex);


let card = Card.Init();
let user = new User();
let order = new Order();

export const store = {
    /*дефолтный стайт*/
    state: {
        card: card,
        user: user,
        order: order,
        showMsgModal: '',
        phone: window.phone,
        showCard: false,
        onLoad: false,
        cardErrors: []

    },
    mutations: {
        setUser(state: any, data: any) {
            state.user = data;
        },
        setCard(state: any, data: any) {
            state.card = data;
        },
        setOrder(state: any, data: any) {
            state.order = data;
        },
        setShowMsgModal(state: any, data: any) {
            state.showMsgModal = data;
        },
        setShowCard(state: any, data: any) {
            state.showCard = data;
        },
        setOnLoad(state: any, data: any) {
            state.onLoad = data;
        },
        setCardErrors(state: any, data: any) {
            state.cardErrors = data;
        },
    }
};



export default new Vuex.Store(store);