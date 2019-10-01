declare var global: any;

import * as mocha from 'mocha';
import { assert } from 'chai';

import * as FUser from "../../src/Func/User/FUser";
import * as FOrder from "../../src/Func/Order/FOrder";
import * as VUser from "../../src/Func/User/VUser";
import { TValidator } from '../../src/Func/TValidator';
import { UserI } from '../../src/Func/User/TUser';

/* запускатор теста для async-await */
async function run() {

    mocha.it('fCheckName', () => {
        const cValidator = new TValidator()
        const name = 'john';
        VUser.fCheckName(cValidator)(name);
        assert.ok(cValidator.fIsOk());
    }); //it ****

    mocha.it('faGetById', async () => {
        const id = 1;
        const user = await FUser.faGetById(id);

        assert.ok(user.id == id);
    }); //it ****

    mocha.it('faRegister', async () => {
        const cValidator = new TValidator()
        const id = 1;
        const user: UserI = {
            phone: '3434388585',
            name: 'John',
            surname: 'Shepard',
        }

        VUser.fVUserRegister(cValidator)
            (user.name)
            (user.surname)
            (user.phone);

        cValidator.fProcess();

        const userId = await FUser.faRegister
            (user.name)
            (user.surname)
            (user.phone);

        assert.ok(userId > 0);
    }); //it ****

    mocha.it('Test currying', async () => {

        const a = ['a', 'b', 'c', 'd'];

        const fc = function (aA: string[]) {
            const s = aA.join('');
            console.log(s);
            
            return function (n: number) {
                return s[n];
            }
        }
        console.log(fc(a)(1));
        
    }); //it ****

    mocha.it('Test currying userID', async () => {

        const John = FUser.faUserId(1);
        const Marry = FUser.faUserId(3);

        const JohnData = await John(FUser.faGetById);
        const MarryData = await Marry(FUser.faGetById);

        console.log(JohnData);
        console.log(MarryData);


        const JohnOrders = await John(FOrder.faGetUserOrders);

        console.log(JohnOrders);
        
        


        
    }); //it ****

}

run();