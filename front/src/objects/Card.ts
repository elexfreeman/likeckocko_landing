declare var localStorage;

export interface CardProductI {
    id: number;
    caption: string;
    price: number;
    img: string;
    count: number;
}

/**
 * Работа с корзиной
 */
export class Card {

    public products: CardProductI[];

    constructor() {
        this.products = [];
    }

    /**
     * Цена общая
     */
    public getTotalPrice(): number {
        let res = 0;
        for (let i = 0; i < this.products.length; i++) {
            res += this.products[i].count * this.products[i].price;
        }
        return res;
    }

    /**
     * Очистить корзину
     */
    public clear() {
        this.products = [];
        this.save();
    }


    public static Init() {
        let self = new Card;
        self.load();
        return self;
    }

    public remove(id: number) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                this.products[i].count--;
                if (this.products[i].count <= 0) this.products.splice(i, 1);
            }
        }

        this.save();
    }

    public removeItem(id: number) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                this.products.splice(i, 1);
            }
        }

        this.save();
    }

    public add(product: CardProductI) {

        let newP = true;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id == product.id) {
                this.products[i].count++;
                newP = false;
            }
        }

        if (newP) {
            this.products.push(product);
        }

        this.save();
    }


    /**
     * Загрудает товары из localStorage
     */
    public load() {
        this.products = [];
        try {
            let card = localStorage.getItem('card');
            if (!card) {
                throw 'error localStorage'
            }

            card = JSON.parse(card);

            for (let i = 0; i < card.length; i++) {
                this.products.push({
                    id: parseInt(card[i]['id']),
                    caption: card[i]['caption'],
                    price: parseFloat(card[i]['price']),
                    img: card[i]['img'],
                    count: card[i]['count']
                })
            }
        } catch (e) {
            this.save();
        }
    }

    /**
     * Сохраняем товары в localStorage
     */
    public save() {
        localStorage.setItem('card', JSON.stringify(this.products));
    }
}