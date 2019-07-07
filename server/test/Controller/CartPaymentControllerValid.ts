
process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');

// Библиотеки
import * as _ from 'lodash';
import * as moment from 'moment'

import coreDBSys from "../../src/System/CoreDBSys";

const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

import axios from "axios";

var qs = require('qs');

// ==================================================
// Параметры теста
// ==================================================
let idOrg = 156; // Ольга
let idCatalog = 3413358;

let idTxn = Math.floor(Math.random()*100000);
let dateTxn = Number(moment(Math.floor(Math.random()*20000000000000)).format('YYYYMMDDHHmmss'));
let account = 156;
let sum = Math.floor(Math.random()*100000)/100;

const vAxios = axios.create({
    baseURL: 'http://dev.63pokupki.node.sp.api.ru:3005',
    timeout: 5000,
    headers: {
        'apikey': '9d50ed61df5951973b9e274f043b4ed7',
    }
});

// ===================================================
// Данные для теста
// ===================================================

/**
 * API для обновления каталогов
 */
const run = async () => {

    await describe('Тестирование оплаты по эквайрингу', async () => {

        idTxn = Math.floor(Math.random()*100000);

        it('Отправляем чек эквайринга', async () => {
            let ok = await callbackCheckAcquire();

            console.log(ok);

            assert.ok(ok);
        }).timeout(5000);

        it('Подтверждаем оплату эквайринга', async () => {
            let ok = await callbackPayAcquire();

            console.log(ok);

            assert.ok(ok);
        }).timeout(5000);

        it('Получение данных о заказе', async () => {
            let resp = await getOrderInfoPayment();

            console.log(resp);

            assert.ok(resp.ok);
        }).timeout(5000);


    });


};

run();

/**
 * Выставление чека и проверка для проведение оплаты
 */
async function callbackCheckAcquire(): Promise<any>{


    let resp = null;
    console.log(`http://dev.63pokupki.node.sp.api.ru:3005/cart/payment/callback-acquire?command=check&txn_id=${idTxn}&txn_date=${dateTxn}&account=${account}&sum=${sum}`);
    try {
        resp = await vAxios.get(
            `/cart/payment/callback-acquire?command=check&txn_id=${idTxn}&txn_date=${dateTxn}&account=${account}&sum=${sum}` ,
        )
    } catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }

    if( resp ){ // Ответ
        return resp.data;
    }
};

/**
 * Поддтверждение оплаты
 */
async function callbackPayAcquire(): Promise<any>{

    let resp = null;
    console.log(`http://dev.63pokupki.node.sp.api.ru:3005/cart/payment/callback-acquire?command=pay&txn_id=${idTxn}&txn_date=${dateTxn}&account=${account}&sum=${sum}`);
    try {
        resp = await vAxios.get(
            `/cart/payment/callback-acquire?command=pay&txn_id=${idTxn}&txn_date=${dateTxn}&account=${account}&sum=${sum}` ,
        )
    } catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }



    if( resp ){ // Ответ
        return resp.data;
    }
};

/**
 * Поддтверждение оплаты
 */
async function getOrderInfoPayment(): Promise<any>{

    let data = {
    };

    let params = qs.stringify({
        invoice_id: account
    });

    let resp = null;
    try {
        resp = await vAxios.post(
            '/cart/payment/get-order-info-payment', params
        )
    } catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }



    if( resp ){ // Ответ
        return resp.data;
    }
};
