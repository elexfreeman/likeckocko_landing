import { Request, Response } from 'express';
import * as Config from '../Config/Config'
import { TValidator } from '../TValidator';
import { SeoI } from './FSeo';

export interface MainRequest extends Request {
    headers: { [key: string]: any };
    body: any;
    method: string;

    sys: {
        token: string,
        bAuth: boolean, /* флаг авторизации */
    };
    conf: Config.ConfI;
    infrastructure: {
        mysql: any;
        redis: any;
        rabbit: any;
    },

    cValidator: TValidator,
    seo?: SeoI,

    errorType?: number

}
