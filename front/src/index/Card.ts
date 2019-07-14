declare var localStorage;
interface ProductI {
    id: number;
    caption: string;
    price: number;
    img: string;
    count: number;
}

/**
 * Работа с корзиной
 */
export default class Card {

    public products: ProductI[];

    constructor() {
        this.products = [];      
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

    public add(product: ProductI) {
        
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