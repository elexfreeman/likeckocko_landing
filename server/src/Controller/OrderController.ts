import * as express from 'express';
import MainRequest from '../System/MainRequest';

import { Product } from '../Infrastructure/typeOrm/Entity/Product';

import BaseController from '../System/BaseController';
import { User } from '../Infrastructure/typeOrm/Entity/User';
import { Order } from '../Infrastructure/typeOrm/Entity/Order';
import { OrderProduct } from '../Infrastructure/typeOrm/Entity/OrderProduct';

const router = express.Router();

/**
 * Контроллер
 */
class OrderController extends BaseController {

    constructor(req: MainRequest, resp: any) {
        super(req, resp);
        console.log('Api OrderController');
    }

    /**
     * Оформить заказ
     */
    public async Checkout() {
        console.log('Api Checkout page');
        let order = new Order();

        this.req.sys.errorSys.declare([
            'empty_card',
            'empty_user',
            'empty_order',
            'empty_user_name',
            'empty_user_phone',
            'empty_card',
            'empty_card',
        ]);
        try {

            if (!this.req.body['card']) {
                this.req.sys.errorSys.error('empty_card', 'Пустая корзина');
            }

            if (!this.req.body['user']) {
                this.req.sys.errorSys.error('empty_user', 'Отсутствует пользователь');
            }

            if (!this.req.body['order']) {
                this.req.sys.errorSys.error('empty_order', 'Отсутствует заказ');
            }

            if (!this.req.body['card']['products']) {
                this.req.sys.errorSys.error('empty_card', 'Пустая корзина');
            }

            if (!this.req.body['user']['name']) {
                this.req.sys.errorSys.error('empty_user_name', 'Пустое имя пользователя');
            }

            if (!this.req.body['user']['phone']) {
                this.req.sys.errorSys.error('empty_user_phone', 'Пустое телефон пользователя');
            }
            console.log(this.req.body);
            if (!this.req.sys.errorSys.isOk()) {
                throw 'err'
            }

            /* создаетм юзера */
            let user = new User();
            user.name = this.req.body['user']['name'];
            user.phone = this.req.body['user']['phone'];
            await this.connection.manager.save(user);

            /* создаем заказ юзера */
            if (this.req.body['order']['city']) {
                order.city = this.req.body['order']['city'];
            }
            if (this.req.body['order']['comment']) {
                order.comment = this.req.body['order']['comment'];
            }
            if (this.req.body['order']['deliveryAddress']) {
                order.deliveryAddress = this.req.body['order']['deliveryAddress'];
            }
            if (this.req.body['order']['deliveryDate']) {
                order.deliveryDate = this.req.body['order']['deliveryDate'];
            }
            if (this.req.body['order']['deliveryTimeComment']) {
                order.deliveryTimeComment = this.req.body['order']['deliveryTimeComment'];
            }

            order.user = user;
            await this.connection.manager.save(order);

            let productsArr = []; // массив id
            let productsCountArr: any = {}; // массив кол-ва
            for (let i = 0; i < this.req.body['card']['products'].length; i++) {
                productsArr.push(this.req.body['card']['products'][i]['id']);
                productsCountArr[this.req.body['card']['products'][i]['id']] = this.req.body['card']['products'][i]['count'];
            }

            /* ищем продукты в DB */
            let products = await this.connection.manager.findByIds(Product, productsArr);

            /* Соддаем список продуктов заказа */
            let orderProducts: OrderProduct[] = [];

            for (let i = 0; i < products.length; i++) {
                let orderProduct = new OrderProduct();
                orderProduct.product = products[i];
                orderProduct.order = order;
                orderProduct.price = products[i].price;
                orderProduct.count = productsCountArr[products[i].id];
                orderProducts.push(orderProduct);
            }

            await this.connection.manager.save(orderProducts);

        } catch (e) {
            this.req.sys.errorSys.error('strange_error', String(e));
            console.log(e)
        }

        this.resp.send(
            this.responseSys.response(order, 'Заказ оформлен')
        );

    }

}

/**
 * Оформить заказ
 */
router.post('/order/checkout', async (req: any, res: any, next) => {
    const self = <OrderController>await OrderController.Init(req, res);
    self.Checkout();
});


export { router };
