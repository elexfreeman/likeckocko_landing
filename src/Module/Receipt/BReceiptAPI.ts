import * as express from 'express';
import { MainRequest } from '../Sys/MainRequest';
import { fResponse } from '../Sys/FResponse';
import { TError } from '../Sys/FErrors';

import * as BReceiptSQL from "./BReceiptSQL";
import { ReceiptR } from "./ReceiptR";


const router = express.Router();

/**
 * Список 
 * @param req 
 * @param res 
 * @param next 
 */
const faListCtrl = async (req: MainRequest, res: express.Response, next: any) => {
    try {

        const data: ReceiptR.list.DataI = {
            list: await BReceiptSQL.faList()
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
 * ПО id
 * @param req 
 * @param res 
 * @param next 
 */
const faGetByIdCtrl = async (req: MainRequest, res: express.Response, next: any) => {
    try {

        const data: ReceiptR.getById.DataI = {
            item: await BReceiptSQL.faGetById(req.body['id'])
        };

        /* отдаем ответ */
        res.send(fResponse(true)
            ({})
            (data)
            ('faGetByIdCtrl')
        );
    } catch (error) {
        req.errorType = TError.Api;
        next(error)
    };
}



router.post(ReceiptR.list.route, faListCtrl);
router.post(ReceiptR.getById.route, faGetByIdCtrl);

export {
    router as ReceiptController
}
