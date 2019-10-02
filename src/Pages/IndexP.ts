import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import * as FProduct from "../Func/Product/FProduct";
import { ProductI } from "../Func/Product/TProduct";
import * as Config from "../Func/Config/Config";
const router = express.Router();

/**
 * Index page
 * @param req 
 * @param res 
 * @param next 
 */
const faIndex = async (req: MainRequest, res: express.Response, next: any) => {
    try {
        const aProducts: ProductI[] = await FProduct.faList();

        res.render('index', {
            seo: req.seo,
            page: "Главная",
            products: aProducts,
            apiUrl: Config.apiUrl
        });
    } catch (error) {
        next(error)
    };

}

/**
 * Индексная страница
 */
router.get('/', faIndex);

export {
    router as IndexController
}
