import * as express from 'express';
import MainRequest from '../System/MainRequest';

import { Product } from '../Infrastructure/typeOrm/Entity/Product';

import BaseController from '../System/BaseController';

const router = express.Router();

/**
 * Контроллер 
 */
class ProductController extends BaseController {

    constructor(req: MainRequest, resp: any) {
        super(req, resp);
        console.log('ProductController');
    }

    /**
     * index page
     */
    public async Product() {
        console.log('Product page');
        let Url = this.req.params['url'];
                
        const product = await this.connection.manager.findOne(Product, { url: Url });
        if (!product) {
            this.resp.status(404).redirect("/")
        } else {
            this.resp.render('product_page', { page: "Главная", product: product });
        }

    }

}

/**
 * Страница товара
 */
router.get('/:url', async (req: any, res: any, next) => {
    const self = <ProductController>await ProductController.Init(req, res);
    self.Product();
});


export { router };
