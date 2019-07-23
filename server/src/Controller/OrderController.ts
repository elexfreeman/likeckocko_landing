import * as express from 'express';
import MainRequest from '../System/MainRequest';

import { Product } from '../Infrastructure/typeOrm/Entity/Product';

import BaseController from '../System/BaseController';
import { User } from '../Infrastructure/typeOrm/Entity/User';
import { Order } from '../Infrastructure/typeOrm/Entity/Order';

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

        let user = new User();
        let order = new Order;
        

        const products = await this.connection.manager.find(Product);
        this.resp.render('index', { page: "Главная", products: products });
    }

}

/**
 * Оформить заказ
 */
router.get('/', async (req: any, res: any, next) => {
    const self = <OrderController>await OrderController.Init(req, res);
    self.Checkout();
});


export { router };
