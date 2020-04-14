import { ErrorsI } from "../TValidator";
import { MainRequest } from "./MainRequest";
import { SeoI } from "./FSeo";
import * as express from 'express';
import * as Config from "../Config/Config";
import { TError } from "./FErrors";
import { sApiVer } from "../Config/Config";

export interface ResponseI {
    ok: boolean,
    errors: ErrorsI,
    data: any,
    msg: any,
}


/**
 * Ответ в шаблон страницы
 * эти переменные используются в шаблоне
 */
export interface ResponseStaticI {
    data: any, // данные под конкретную стр
    layout?: boolean;
    seo?: SeoI;
    apiUrl: string;
    sApiVer: string;
    site: {
        phone: string,
        email: string,
    }
}


export const fResponse =
    (ok: boolean) =>
        (errors: ErrorsI) =>
            (data: any) =>
                (msg: any): ResponseI => {
                    return {
                        ok: ok,
                        errors: errors,
                        data: data,
                        msg: msg,
                    }
                }


/**
 * Функиця формирующая данные для шаблона
 * Ответ в шаблон страницы
 * эти переменные используются в шаблоне
 * @param req 
 * @param data 
 */
export const fResponseStatic = (req: MainRequest, data: any): ResponseStaticI => {
    return {
        data: data, // данные под конкретную стр
        seo: req.seo,
        apiUrl: Config.apiUrl,
        site: Config.site,
        sApiVer: sApiVer,
        // layout: true, // вкл главный шаблон backend/src/Views/layouts/main.hbs
    };
}




/**
 * Функция рендера страницы
 * @param faCallback - функция контролера
 * @param tpl - путь к шаблону hbs
 */
export const faSendRouter = (tpl: string, faCallback: Function) => {
    return async (req: MainRequest, res: express.Response, next: any) => {
        try {
            res.render(tpl, fResponseStatic(req, await faCallback(req)));
        } catch (error) {
            console.log(error);
            req.errorType = TError.PageNotFound;
            next(error);
        }
    };
};

