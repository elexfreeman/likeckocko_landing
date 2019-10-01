import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import * as Config from "../Func/Config/Config";
const router = express.Router();

/**
 * Index page
 * @param req 
 * @param res 
 * @param next 
 */
const faCart = async (req: MainRequest, res: express.Response, next: any) => {
    try {
        res.render('cart', {
            seo: req.seo,
            page: "Корзина",
            apiUrl: Config.apiUrl
        });
    } catch (error) {
        req.errorType = 404;
        next(error)
    };
}

/**
 * Страница товара
 */
router.get('/cart', faCart);

export {
    router as CartController
}
