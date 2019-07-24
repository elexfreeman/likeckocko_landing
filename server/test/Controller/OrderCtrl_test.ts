
process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');


const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

import axios from "axios";

const vAxios = axios.create({
    baseURL: 'http://localhost:3005',
    timeout: 5000,
    headers: {
        /* 'apikey': '9d50ed61df5951973b9e274f043b4ed7', */
    }
});

// ===================================================
// Данные для теста
// ===================================================

/**
 * API для обновления каталогов
 */
const run = async () => {

    await describe('Тестирование создания заказа', async () => {

        let idTxn = Math.floor(Math.random() * 100000);

        it('Новый заказ', async () => {

            let resp = await vAxios.post(
                `/order/checkout`, {

                }
            )

            console.log(resp);

            assert.ok(true);
        }).timeout(5000);




    });


};

run();
