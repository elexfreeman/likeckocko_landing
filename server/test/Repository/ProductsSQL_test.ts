process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');


const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

import { ProductSQL } from "../../src/Infrastructure/SQL/Repository/ProductSQL";

import MainRequest from "../../src/System/MainRequest";
import { ErrorSys } from '../../src/System/ErrorSys';
import * as moment from 'moment';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * API для обновления каталогов
 */
const run = async () => {

    await describe('Проверка работы ProductSQL', async () => {

        it('list', async () => {
         
            let mm = new ProductSQL();

            let data = await mm.list(0, 10, {});          

            console.log(data);
            assert(true);


        }).timeout(3000);




    });


};

run();
