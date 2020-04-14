import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { OrderI } from '../../Module/Order/TOrder';
import * as FFOrder from '../../Module/Order/FFOrder';
import * as FFUser from '../../Module/User/FFUser';
import * as FCommonOrder from '../../Module/Order/FCommonOrder';

import { UserI } from '../../Module/User/TUser';

declare var window: any;
Vue.use(Vuex);


export interface RootState {
    order: OrderI;
    user: UserI;
    showMsgModal: string;
    phone: string;
    showCart: boolean;
    onLoad: boolean;
    cartErrors: any[];
    cartFormError: boolean;
    totalPrice: number;
}

export const store: StoreOptions<RootState> = {
    /*дефолтный стайт*/
    state: {
        order: FFOrder.fGet(),
        user: FFUser.fGet(),
        showMsgModal: '',
        phone: window.phone,
        showCart: false,
        onLoad: false,
        cartErrors: <any>[],
        cartFormError: false,
        totalPrice: FCommonOrder.fCalcOrderTotalSumm(FFOrder.fGet().products),
    },
    mutations: {
        setOrder(state: RootState, data: OrderI) {
            state.order = data;
        },
        setTotalPrice(state: RootState, data: number) {
            state.totalPrice = data;
        },
        setUser(state: RootState, data: UserI) {
            state.user = data;
        },
        setShowMsgModal(state: RootState, data: any) {
            state.showMsgModal = data;
        },
        setShowCart(state: RootState, data: any) {
            state.showCart = data;
        },
        setOnLoad(state: RootState, data: any) {
            state.onLoad = data;
        },
        setCartErrors(state: RootState, data: any) {
            state.cartErrors = data;
        },
        setCartFormError(state: RootState, data: any) {
            state.cartFormError = data;
        },
    }
};



export default new Vuex.Store(store);