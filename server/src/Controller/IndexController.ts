const express = require('express');
const router = express.Router();

import { BaseCtrl } from '@a-a-game-studio/aa-core/lib/Namespace/System';
import { MainRequest } from '@a-a-game-studio/aa-core/lib/System/MainRequest';
import { Product } from '../Module/Product/Product';
import { ChockoListDB } from '../Module/ChockoListDB';
import { ChockoConfI } from '../Module/ConfigI';

/**
 * Контроллер 
 */
class IndexController extends BaseCtrl {
    public conf: ChockoConfI;
    public product: Product;

    constructor(req: MainRequest, resp: any) {
        super(req, resp);
        //test
        console.log('IndexController');
        this.conf = <ChockoConfI>this.req.conf;

        this.product = Product.Init(
            this.req.sys.errorSys,
            null,
            <ChockoListDB>this.req.sys.userSys.listDB
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

        console.log(products);
        console.log(this.product.errorSys.getErrors());
        
        

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
