import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import { faSendRouter } from "../Func/Sys/FResponse";
import { IndexR as R} from "./Router"

const router = express.Router();

/**
 * Страница товара
 */
router.get(R.sUrl,  faSendRouter(R.sTpl, async (req: MainRequest) => {
    req.seo.sPage = "Корзина";
    return {
    }
}));

export {
    router as CartController
}
