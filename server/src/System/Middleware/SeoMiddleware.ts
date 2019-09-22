import { System } from '@a-a-game-studio/aa-core/lib';
import { ChockoSeo } from '../../Components/ChockoSeo';
const config = require('../../Configs/MainConfig.js');

/**
 * Сео параметры
 * @param req 
 * @param response 
 * @param next 
 */
export function SeoMiddleware(req: System.MainRequest.MainRequest, resp: any, next: any) {

    if (req.method == 'GET') {
        req.seo = new ChockoSeo(req, config);
    }

    next();
}
