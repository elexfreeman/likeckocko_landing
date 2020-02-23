import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import * as FProduct from "../Func/Product/FProduct";
import { ProductI } from "../Func/Product/TProduct";
import { faSendRouter } from "../Func/Sys/FResponse";
const router = express.Router();


/**
 * Индексная страница
 */
router.get('/',  faSendRouter('index', async (req: MainRequest) => {
    const aProducts: ProductI[] = await FProduct.faList();
    return {
        products: aProducts,
    }
}));

export {
    router as IndexController
}
