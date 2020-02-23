import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import { faSendRouter } from "../Func/Sys/FResponse";
const router = express.Router();

/**
 * Страница товара
 */
router.get('/cart',  faSendRouter('cart', async (req: MainRequest) => {
    req.seo.sPage = "Корзина";
    return {
    }
}));

export {
    router as CartController
}
