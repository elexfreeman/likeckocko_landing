import * as express from 'express';
import MainRequest from '../System/MainRequest';

import BaseController from '../System/BaseController';

const router = express.Router();

/**
 * Контроллер 
 */
class CartCotroller extends BaseController {

    constructor(req: MainRequest, resp: any) {
        super(req, resp);
        console.log('CartCotroller');
    }

    /**
     * index page
     */
    public async Index() {
        console.log('cart page');
        this.resp.render('cart', {
            seo: this.req.sys.seo,
            page: "Корзина",
            apiUrl: this.req.apiUrl
        });
    }

}

/**
 * Индексная страница
 */
router.get('/cart', async (req: any, res: any, next) => {
    const self = <CartCotroller>await CartCotroller.Init(req, res);
    self.Index();
});


export { router };
