import { MainRequest } from "../Module/Sys/MainRequest";
import * as express from 'express';
import * as FProduct from "../Module/Product/FProduct";
import { ProductI } from "../Module/Product/TProduct";
import { faSendRouter } from "../Module/Sys/FResponse";
import { ProductR as R} from "./Router"

const router = express.Router();


/**
 * Страница товара
 */
router.get(R.sUrl,  faSendRouter(R.sTpl, async (req: MainRequest) => {
    const product: ProductI = await FProduct.faByUrl(req.params['url']);       
    req.seo.sPage = "Товар";
    req.seo.sTitle = `Likechoco - ${product.caption}`;
    req.seo.sDescription = `Likechoco - ${product.description}`;
    return {
        product: product,
    }
}));

export {
    router as ProductController
}
