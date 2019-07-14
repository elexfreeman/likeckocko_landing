import Vue from 'vue';
import Vuex from 'vuex';
declare var window;
Vue.use(Vuex);

export const store = {
    /*дефолтный стайт*/
    state: {
        card: null,
        showMsgModal: '',
        phone: window.phone

    },
    mutations: {
        setCard(state: any, data: any) {
            state.card = data;
        },
        setShowMsgModal(state: any, data: any) {
            state.showMsgModal = data;
        },
    }
};



export default new Vuex.Store(store);