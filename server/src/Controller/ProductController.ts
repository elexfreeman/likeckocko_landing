const express = require('express');
const router = express.Router();

import { MainRequest } from '@a-a-game-studio/aa-core/lib/System/MainRequest';
import { Product } from '../Module/Product/Product';
import { ChockoCtrl } from './ChockoCtrl';

/**
 * Контроллер 
 */
class ProductController extends ChockoCtrl {

    public product: Product;

    constructor(req: MainRequest, resp: any) {
        super(req, resp);

        this.product = Product.Init(
            this.req.sys.errorSys,
            null,
            this.listDB
        );
    }

    /**
     * index page
     */
    public async Product() {
        console.log('Product page');
        let sUrl = this.req.params['url'];

        await this.product
            .actions
            .infoA
            .faGetInfoByUrl(sUrl);

        if (!this.product.is()) {
            this.resp.status(404).redirect("/");
        } else {
            this.req.seo.sTitle = 'Likechoco | ' + this.product.data.caption
            this.req.seo.reload();

            this.resp.render('product_page', {
                seo: this.req.seo,
                page: "Главная",
                product: this.product,
                apiUrl: this.conf.apiUrl
            });

        }

    }

}

/**
 * Страница товара
 */
router.get('/:url', async (req: any, res: any, next: any) => {
    const self = <ProductController>await ProductController.Init(req, res);
    self.Product();
});


export { router as ProductController };
