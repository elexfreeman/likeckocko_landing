import * as express from 'express';
import { MainRequest } from '../Sys/MainRequest';
import { fResponse } from '../Sys/FResponse';
import { TError } from '../Sys/FErrors';

import * as BEdSQL from "./BEdSQL";
import { EdR } from "./EdR";


const router = express.Router();

/**
 * Список единиц измерений
 * @param req 
 * @param res 
 * @param next 
 */
const faListCtrl = async (req: MainRequest, res: express.Response, next: any) => {
    try {

        const data: EdR.list.DataI = {
            list: await BEdSQL.faList()
        };

        /* отдаем ответ */
        res.send(fResponse(true)
            ({})
            (data)
            ('faListCtrl')
        );
    } catch (error) {
        req.errorType = TError.Api;
        next(error)
    };
}

/**
 * Страница товара
 */
router.post(EdR.list.route, faListCtrl);

export {
    router as EdController
}
