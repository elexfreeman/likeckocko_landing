declare var global: any;

import * as mocha from 'mocha';
import { assert } from 'chai';

import * as fTUser from "../../src/Func/User/fUser";
import * as VOrder from "../../src/Func/Order/VOrder";
import * as FOrder from "../../src/Func/Order/FOrder";
import { TValidator } from '../../src/Func/TValidator';
import { OrderI } from '../../src/Func/Order/TOrder';

/* запускатор теста для async-await */
async function run() {

    mocha.it('fVMakeOrder', () => {
        const cValidator = new TValidator();
        const order: OrderI = {
            user_id: 10,
            delivery_address: "delivery_address",
            comment: "comment",
            delivery_date: "2019-02-02",
            delivery_time_comment: "",
            products: [
                {
                    product_id: 1,
                    price: 100,
                    count: 10,
                }
            ]
        };
        VOrder.fVMakeOrder(cValidator)
            (order);
        console.log(cValidator.fGetErrors());

        assert.ok(cValidator.fIsOk());
    }); //it ****

    mocha.it('fMakeOrder', async () => {
        const cValidator = new TValidator();
        const order: OrderI = {
            user_id: 10,
            delivery_address: "delivery_address",
            comment: "comment",
            delivery_date: "2019-02-02",
            delivery_time_comment: "",
            products: [
                {
                    product_id: 1,
                    price: 100,
                    count: 10,
                }
            ]
        };
        VOrder.fVMakeOrder(cValidator)(order);
        cValidator.fProcess();

        await FOrder.fMakeOrder(order)(FOrder.fCalcOrderTotalSumm);


        console.log(cValidator.fGetErrors());

        assert.ok(cValidator.fIsOk());
    }); //it ****

}

run();