import { Card } from "./Card";

export class User {
    public name: string;
    public phone: string;


    private card: Card; // корзина

    constructor(card: Card) {
        this.card = card;
    }

    public checkout() {

    }
}