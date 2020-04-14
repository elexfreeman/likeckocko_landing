import * as FFOrder from './FFOrder';
import * as FCommonOrder from './FCommonOrder';

/**
 * Заказ
 */
export const OrderStore = {
    state: {
        order: FFOrder.fGet(),
        totalPrice: FCommonOrder.fCalcOrderTotalSumm(FFOrder.fGet().products),
    },
    mutations: {
        setOrder(state: any, data: any) {
            state.order = data;
        },
        setTotalPrice(state: any, data: any) {
            state.totalPrice = data;
        },
    }
};
