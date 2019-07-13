import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = {
    /*дефолтный стайт*/
    state: {
        card: null,
        showMsgModal: null

    },
    mutations: {
        setCard(state: any, data: any) {
            this.card = data;
        },
        setShowMsgModal(state: any, data: any) {
            this.showMsgModal = data;
        },
    }
};



export default new Vuex.Store(store);