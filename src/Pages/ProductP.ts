import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import * as FProduct from "../Func/Product/FProduct";
import { ProductI } from "../Func/Product/TProduct";
import * as Config from "../Func/Config/Config";
import { TError } from "../Func/Sys/FErrors";
const router = express.Router();

/**
 * Index page
 * @param req 
 * @param res 
 * @param next 
 */
const faProduct = async (req: MainRequest, res: express.Response, next: any) => {
    try {
        const product: ProductI = await FProduct.faByUrl(req.params['url']);       

        res.render('product_page', {
            seo: req.seo,
            page: "Главная",
            product: product,
            apiUrl: Config.apiUrl
        });
    } catch (error) {
        req.errorType = TError.PageNotFound;
        next(error)
    };

}

/**
 * Страница товара
 */
router.get('/:url', faProduct);

export {
    router as ProductController
}
