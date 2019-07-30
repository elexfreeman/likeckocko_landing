import MainRequest from '../MainRequest';
import { Seo } from '../../Components/Seo';
import { config } from '../../Configs/config';
/**
 * Сео параметры
 * @param request 
 * @param response 
 * @param next 
 */
export default function SeoMiddleware(request: MainRequest, response: any, next: any) {

    if (request.method == 'GET') {
        request.sys.seo = new Seo(request, config);
    }

    next();
}
