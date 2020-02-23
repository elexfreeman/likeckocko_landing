import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import * as FProduct from "../Func/Product/FProduct";
import { ProductI } from "../Func/Product/TProduct";
import { faSendRouter } from "../Func/Sys/FResponse";
const router = express.Router();


/**
 * Страница товара
 */
router.get('/:url',  faSendRouter('product_page', async (req: MainRequest) => {
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
