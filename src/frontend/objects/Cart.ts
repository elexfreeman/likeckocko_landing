declare var localStorage: any;

export interface CartProductI {
    id: number;
    caption: string;
    price: number;
    img: string;
    count: number;
}

/**
 * Работа с корзиной
 */
export class Cart {

    public products: CartProductI[];

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
        let self = new Cart;
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

    public add(product: CartProductI) {

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
            let cart = localStorage.getItem('cart');
            if (!cart) {
                throw 'error localStorage'
            }

            cart = JSON.parse(cart);

            for (let i = 0; i < cart.length; i++) {
                this.products.push({
                    id: parseInt(cart[i]['id']),
                    caption: cart[i]['caption'],
                    price: parseFloat(cart[i]['price']),
                    img: cart[i]['img'],
                    count: cart[i]['count']
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
        localStorage.setItem('cart', JSON.stringify(this.products));
    }
}