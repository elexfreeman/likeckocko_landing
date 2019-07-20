import Vue from 'vue';
import Vuex from 'vuex';
import { Card } from '../objects/Card';
import { User } from '../objects/User';
declare var window;
Vue.use(Vuex);


let card = Card.Init();
let user = new User();

export const store = {
    /*дефолтный стайт*/
    state: {
        card: card,
        user: user,
        showMsgModal: '',
        phone: window.phone,
        showCard: false

    },
    mutations: {
        setUser(state: any, data: any) {
            state.user = data;
        },
        setCard(state: any, data: any) {
            state.card = data;
        },
        setShowMsgModal(state: any, data: any) {
            state.showMsgModal = data;
        },
        setShowCard(state: any, data: any) {
            state.showCard = data;
        },
    }
};



export default new Vuex.Store(store);