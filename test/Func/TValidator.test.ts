declare var global: any;

import * as mocha from 'mocha';
import { assert } from 'chai';

import * as TValidator from '../../src/Func/TValidator';


mocha.it('fCheckName', () => {
    const errors = {
        "user": { "isNotExist": false },
        "User.name": { "isNotExist": false, "isNotText": false, "lessThanMinLen": false },
        "User.phone": { "isNotExist": false, "isNotText": false, "lessThanMinLen": true },
        "Order.userId": { "isNotExist": false, "isNotInt": false, "isNotMoreThan": false },
        "Order.sDeliveryAddress": { "isNotExist": false, "isNotText": false, "lessThanMinLen": false },
        "Order.sComment": { "isNotExist": false, "isNotText": false },
        "Order.sDeliveryDate": { "isNotExist": false, "isNotText": false },
        "Order.sDeliveryTimeComment": { "isNotExist": false, "isNotText": false },
        "Order.aProducts": { "isNotExist": false, "fncHasError": false },
        "OrderProduct.productId.0": {
            "isNotExist": false, "isNotInt": false, "isNotMoreThan": false
        },
        "OrderProduct.price.0": { "isNotExist": false, "isNotInt": false, "isNotMoreThan": false },
        "OrderProduct.count.0": { "isNotExist": false, "isNotInt": false, "isNotMoreThan": false },
        "OrderProduct.productId.1": { "isNotExist": false, "isNotInt": false, "isNotMoreThan": false },
        "OrderProduct.price.1": { "isNotExist": false, "isNotInt": false, "isNotMoreThan": false },
        "OrderProduct.count.1": { "isNotExist": false, "isNotInt": false, "isNotMoreThan": false }
    }


    assert.ok(!TValidator.fHasError(errors)('User.name'));
    assert.ok(TValidator.fHasError(errors)('User.phone'));
}); //it ****
