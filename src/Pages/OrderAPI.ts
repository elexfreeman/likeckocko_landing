import { MainRequest } from "../Module/Sys/MainRequest";
import * as express from 'express';
import { fResponse } from "../Module/Sys/FResponse";
import { TError } from "../Module/Sys/FErrors";

import * as VUser from "../Module/User/VUser";
import * as FUser from "../Module/User/FUser";

import * as VOrder from "../Module/Order/VOrder";
import * as FOrder from "../Module/Order/BOrder";
import * as FCommonOrder from "../Module/Order/FCommonOrder";
import { CheckoutI } from "../Module/Sys/ReqI/OrderR";

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
