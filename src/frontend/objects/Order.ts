import { User } from "./User";
import { Cart } from "./Cart";
import BaseObject from "./BaseObject";
import { ProductI } from "../../Func/Product/TProduct";
import { OrderI } from "../../Func/Order/TOrder";

/**
 * Заказ
 */
export class Order extends BaseObject {

    public data: OrderI;

    /**
     * 
     * @param user - пользователь
     * @param cart - его корзина
     */
    constructor() {
        super();
    }

    /**
     * Оформить заказ
     */
    public async Checkout(user: User, cart: Cart) {
        this.ok = true;

        let resp = await this.axios.post(this.apiUrl + '/order/checkout', {
            user: user,
            order: this.data,
        });
        return resp['data'];
    }



}