import { OrderI } from "./TOrder";
import axios from "axios";
import { apiUrl } from "../Config/Config";
import { UserI } from "../User/TUser";
import { CheckoutI, CheckoutRespI } from "../Sys/ReqI/OrderR";


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