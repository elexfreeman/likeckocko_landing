declare var global: any;

import * as mocha from 'mocha';
import { assert } from 'chai';

import * as fTUser from "../../src/Func/fUser";
import { TValidator } from '../../src/Func/TValidator';

/* запускатор теста для async-await */
async function run() {

    mocha.it('fCheckName', () => {
        const cValidator = new TValidator()
        const name = 'john';
        fTUser.fCheckName(cValidator)(name);
        assert.ok(true);
    }); //it ****

    mocha.it('faGetById', async () => {
        const cValidator = new TValidator()
        const id = 1;

        const user = await fTUser.faGetById(id);

        assert.ok(user.id == id);
    }); //it ****

    mocha.it('faRegister', async () => {
        const cValidator = new TValidator()
        const id = 1;

        const userId = await fTUser
            .faRegister(cValidator)
            ('Johnd')
            ('Shepard')
            ('124579654');

        assert.ok(userId > 0);
    }); //it ****

}

run();