import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import * as FProduct from "../Func/Product/FProduct";
import { ProductI } from "../Func/Product/TProduct";
import { faSendRouter } from "../Func/Sys/FResponse";
import { IndexR as R} from "./Router"

const router = express.Router();



/**
 * Индексная страница
 */
router.get(R.sUrl,  faSendRouter(R.sTpl, async (req: MainRequest) => {
    const aProducts: ProductI[] = await FProduct.faListByCategoryId(1);
    return {
        products: aProducts,
    }
}));

export {
    router as IndexController
}
