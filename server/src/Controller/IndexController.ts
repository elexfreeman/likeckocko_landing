const express = require('express');
const router = express.Router();

import { MainRequest } from '@a-a-game-studio/aa-core/lib/System/MainRequest';
import { Product } from '../Module/Product/Product';
import { ChockoCtrl } from './ChockoCtrl';

/**
 * Контроллер 
 */
class IndexController extends ChockoCtrl {

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
    public async Index() {
        console.log('index page');

        const products = await this.product
            .actions
            .infoA
            .faGetList();

        this.resp.render('index', {
            seo: this.req.seo,
            page: "Главная",
            products: products,
            apiUrl: this.conf.apiUrl
        });
    }

    /**
     * index page
     */
    public async Robots() {
        console.log('Robots page');

        const products = await this.product
            .actions
            .infoA
            .faGetList();

        this.resp.header("Content-Type", "text/plain");
        this.resp.render('robots', {
            seo: this.req.seo,
            page: "Главная",
            products: products,
            apiUrl: this.conf.apiUrl,
            Host: this.req['headers']['host']
        });
    }

}

/**
 * Индексная страница
 */
router.get('/', async (req: any, res: any, next: any) => {
    const self = <IndexController>await IndexController.Init(req, res);
    self.Index();
});

/**
 * Индексная страница
 */
router.get('/robots.txt', async (req: any, res: any, next: any) => {
    console.log(req);
    const self = <IndexController>await IndexController.Init(req, res);
    self.Robots();
});


export {
    router as IndexController
};
