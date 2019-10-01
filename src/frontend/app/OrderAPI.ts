import { OrderI } from "../../Func/Order/TOrder";
import axios from "axios";
import { apiUrl } from "../../Func/Config/Config";
import { UserI } from "../../Func/User/TUser";
import { CheckoutI, CheckoutRespI } from "../../Func/Sys/ReqI/OrderR";


const vAxios = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {}
});

/**
 * Офрмить заказ
 * @param user 
 */
export const fCheckout =
    (user: UserI) =>
        async (order: OrderI): Promise<CheckoutRespI> => {
            const resp = await (vAxios.post(
                `/order/checkout`, {
                user: user,
                order: order
            }));
            return <CheckoutRespI>resp['data'];
        }