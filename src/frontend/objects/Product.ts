

export default class Product {

    public id: number;
    public caption: string;
    public price: number;

    constructor(id: number, caption: string, price: number) {
        this.id = id;
        this.caption = caption;
        this.price = price;
    }

}