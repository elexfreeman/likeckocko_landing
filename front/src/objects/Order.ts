import { User } from "./User";
import { Card } from "./Card";
import BaseObject from "./BaseObject";

export class Order extends BaseObject {

    private user: User;
    private card: Card;

    constructor(user: User, card: Card) {
        super();
        this.user = user;
        this.card = card;
    }


    public async Checkout(): Promise<boolean> {

        let reps = await this.axios.post(this.apiUrl + '/order/checkout', {
            user: this.user,
            card: this.card
        })

        return true;
    }



}