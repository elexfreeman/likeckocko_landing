declare var global: any;

import * as mocha from 'mocha';
import { assert } from 'chai';

import * as FUser from "../../src/Func/User/FUser";
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

}

run();