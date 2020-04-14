import { OrderI } from "../../Order/TOrder";

export interface CheckoutI {
    user : {
        name: string,
        surname: string,
        phone: string,
    },
    order: OrderI
    
}

export interface CheckoutRespI {
    ok: boolean;
    errors: any[];
    data: {
        order_id: number;
    };
    msg: string;

}