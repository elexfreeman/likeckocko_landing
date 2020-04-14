import { MainRequest } from "../Module/Sys/MainRequest";
import * as express from 'express';
import { faSendRouter } from "../Module/Sys/FResponse";
import { CartR as R} from "./Router"

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
