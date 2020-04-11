import * as Config from "../../Config/Config";

import * as moment from "moment";
import * as express from 'express';
import { MainRequest } from "../MainRequest";
import { TError } from "../FErrors";
import { fResponse, fResponseStatic } from "../FResponse";

/**
 * Страница не найдена
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
const fErorr404 = (err: any, req: MainRequest, res: express.Response, next: express.NextFunction) => {
    res.status(404).render('404', fResponseStatic(req, {}))

    next(err);
}

/**
 * ощибка валидации метод сипользутеся в API
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
const fErrorValidation = (err: any, req: MainRequest, res: express.Response, next: express.NextFunction) => {
    res.send(fResponse(false)
        (req.cValidator.fGetErrors()) // ошибки
        (null) // data
        (err) // msg
    );

    next(err);
}

/**
 * 500 - все плохо
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */
const fError500 = (err: any, req: MainRequest, res: express.Response, next: express.NextFunction) => {
    res.status(500).render('404', {
        seo: req.seo,
        page: "500",
        apiUrl: Config.apiUrl
    });

    console.log(
        '=================================== \r\n',
        moment().format(), '\r\n',
        'err.stack: \r\n ',
        '----------------------------------- \r\n',
        err.stack, '\r\n',
        '----------------------------------- \r\n',
        'originalUrl:', req.originalUrl, '\r\n',
        '=================================== \r\n',
        '\r\n'
    );

    next(err);
}

export const fLogErrors = (err: any, req: MainRequest, res: express.Response, next: express.NextFunction) => {

    switch (req.errorType) {
        case TError.PageNotFound:
            fErorr404(err, req, res, next);
            break;
        case TError.Api:
            fErrorValidation(err, req, res, next);
            break;

        default:
            fError500(err, req, res, next);
            break;
    }

}
