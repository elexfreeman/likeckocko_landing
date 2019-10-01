process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');


const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

import axios from "axios";

import * as OrderAPI from "../../src/frontend/app/OrderAPI";
import { OrderI } from "../../src/Func/Order/TOrder";

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

            let user = {
                name: 'user name',
                surname: '9638546787',
                phone: '9638546787',
                token: 'qweqasd234',
            };

            const order: OrderI = {
                city: 'string',
                delivery_address: 'string',
                comment: 'string',
                delivery_date: 'string',
                delivery_time_comment: 'string',
                products: [
                    {
                        product_id: 1,
                        caption: 'asd',
                        price: 444,
                        count: 2,
                    },
                    {
                        product_id: 2,
                        caption: 'asdad',
                        price: 555,
                        count: 3434,
                    }
                ]
            }

            let resp = await OrderAPI.fCheckout(user)(order)


            console.log(resp.data);

            assert.ok(resp.ok);
        }).timeout(5000);


        it('Новый заказ ошибка валидации', async () => {

            let user = {
                name: 'user name',
                surname: '9638546787',
                phone: '9638546787',
                token: 'qweqasd234',
            };

            let order = {
                city: 'string',
                delivery_address: 'string',
                comment: 'string',
                delivery_date: 'string',
                delivery_time_comment: 'string',
                products: [
                    {
                        product_id: 1,
                        caption: 'asd',
                        price: 444,
                        count: 2,
                    },
                    {
                        product_id: 2,
                        caption: 'asdad',
                        price: 555,
                        count: '34577вка34',

                    }
                ]
            }

/* 
            let resp = await vAxios.post(
                `/order/checkout`, {
                user: user,
                order: order
            }
            );

            console.log(resp.data);

            assert.ok(!resp.data.ok); */
        }).timeout(5000);


    });


};

run();
