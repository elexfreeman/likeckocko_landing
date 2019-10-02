import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import { fResponse } from "../Func/Sys/FResponse";
import { TError } from "../Func/Sys/FErrors";

import * as VUser from "../Func/User/VUser";
import * as FUser from "../Func/User/FUser";

import * as VOrder from "../Func/Order/VOrder";
import * as FOrder from "../Func/Order/FOrder";
import * as FCommonOrder from "../Func/Order/FCommonOrder";
import { CheckoutI } from "../Func/Sys/ReqI/OrderR";

const router = express.Router();

/**
 * Index page
 * @param req 
 * @param res 
 * @param next 
 */
const faCheckout = async (req: MainRequest, res: express.Response, next: any) => {
    try {

        /* типизируем req */
        const body: CheckoutI = req.body;

        /* валидируем данные пользваотеля */
        req.cValidator
            .fSetData(body['user'])
            .fSetErrorString('user')
            .fExist();

        req.cValidator.fProcess();

        /* решистрируем пользователя */

        /* валидируем поля */
        VUser.fVUserRegister(req.cValidator)
            (body['user'].name)
            (body['user'].surname)
            (body['user'].phone);

        req.cValidator.fProcess();


        /* записываем в DB */
        const userId: number = await FUser.faRegister(body['user'].name)
            (body['user'].surname)
            (body['user'].phone);

        /* ----------------------------------- */

        /* валидируем заказ */
        VOrder.fVMakeOrder(req.cValidator)
            (userId)
            (body['order']);

        req.cValidator.fProcess();

        /* записываем заказ */
        const orderId = await FOrder.fMakeOrder(userId)
            (body['order'])
            (FCommonOrder.fCalcOrderTotalSumm);

        /* отдаем ответ */
        res.send(fResponse(true)
            (req.cValidator.fGetErrors())
            ({
                order_id: orderId
            })
            ('faCheckout')
        );
    } catch (error) {
        req.errorType = TError.Api;
        next(error)
    };
}

/**
 * Страница товара
 */
router.post('/order/checkout', faCheckout);

export {
    router as OrderController
}
