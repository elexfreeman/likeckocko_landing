import * as express from 'express';
import MainRequest from '../System/MainRequest';

import { Product } from '../Infrastructure/typeOrm/Entity/Product';

import BaseController from '../System/BaseController';

const router = express.Router();

/**
 * Контроллер 
 */
class IndexController extends BaseController {  

    constructor(req: MainRequest, resp: any) {
        super(req, resp);
        console.log('IndexController');       
    }  

    /**
     * index page
     */
    public async Index() {
        console.log('index page');
        const products = await this.connection.manager.find(Product);
        this.resp.render('index', { page: "Главная", products: products });
    }

}

/**
 * Индексная страница
 */
router.get('/', async (req: any, res: any, next) => {
    const self = <IndexController> await IndexController.Init(req, res);
    self.Index();
});


export { router };
