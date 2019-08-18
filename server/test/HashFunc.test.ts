process.env.TS_NODE_PROJECT = './tsconfig.json';

// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');

/* инициализирует фронтовые штуки */
import initMosk from "./mosk";
import { generateToken } from "../src/DB/HashFunc";
initMosk();

/*дял запросов на сервер*/

/*для проверок*/
const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

/* *********************************************** */
/* *********************************************** */
/* *********************************************** */

let total = 100000;
/* запускатор теста для async-await */
async function run() {

    /* описание теста */
    describe('Тест HashFunc.test', () => {

        it(`Тест на уникальность на ${total} значений`, () => {

            let b: any = {};
            for (let i = 0; i < total; i++) {
                let token = generateToken();
                /* if (i == 1) {
                    token = '1a';
                }
                if (i == 10) {
                    token = '1a';
                } */
                if (b[token]) {
                    b[token] = b[token] + 2;
                } else {
                    b[token] = 1;
                }
            }

            //assert.ok(b['1a'] == 3);

            let count = 0;
            for (let k in b) {
                count += b[k];
            }

            assert.ok(count == total);
        }).timeout(6000);; //it ****

    });




}

run();