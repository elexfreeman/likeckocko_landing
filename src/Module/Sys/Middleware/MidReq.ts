import { MainRequest } from "../MainRequest";
import { TValidator } from "../../TValidator";
import * as Config from '../../Config/Config'
import { Request, Response } from 'express';
import * as moment from "moment";
export function MidReq(request: MainRequest, response: Response, next: any) {

    request.errorType = 0;
    request.sys = {
        token: '',
        bAuth: false, /* флаг авторизации */
    }

    if (request.headers.token) {
        request.sys.token = request.headers.token;
    }

    request.cValidator = new TValidator();

    request.conf = Config;

    if ((request.method == 'POST') && (request.body['data'])) {
        try {
            request.body['data'] = JSON.parse(request.body['data']);
        } catch (e) {
            request.body['data'] = null;
        }
    }

    if (request.originalUrl.indexOf('/img') == -1) {
        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`, `{ ${request.method} }`, request.originalUrl);
    }



    next();
}
