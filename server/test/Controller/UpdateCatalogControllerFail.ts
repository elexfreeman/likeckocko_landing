
process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');

import * as _ from 'lodash';


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
let idCatalogFail = 3413358123;
const vAxios = axios.create({
    baseURL: 'http://dev.63pokupki.node.sp.api.ru:3005',
    timeout: 5000,
    headers: {
        'apikey': '2131231231231231231231231312312'
    }
});

// ===================================================
// Данные для теста
// ===================================================
import {failVarsItem} from '../../src/Data/tests/update_catalog/fail_data_list';
import {failImg} from '../../src/Data/tests/update_catalog/fail_img_list';

import {validVarsItem} from '../../src/Data/tests/update_catalog/valid_data_list';
import {validImageList} from '../../src/Data/tests/update_catalog/valid_img_list';



/**
 * API для обновления каталогов
 */
const run = async () => {

    await describe('Проверяем наличие каталога', async () => {

        it('Проверяем наличие каталога', async () => {
            let ok = await ifCatalogExist();

            assert.ok(ok);
        }).timeout(5000);

        it('Получаем товары', async () => {

            let resp = await getAllItemFromCatalog();

            assert.notEqual(resp, null);

        }).timeout(5000);

    });

    await describe('Добавление новых товаров к каталогу', async () => {

        it('Удаляем все товары из каталога', async ()=>{

            let resp = await delAllItemFromCatalog();
            assert.notEqual(resp, -1);

        }).timeout(5000);

        it('Добавляем новые товары к каталогу', async ()=>{

            let resp = await addNewItemIntoCatalog();

            console.log(JSON.stringify(resp, null, 2));

            assert.notEqual(resp, null);

        }).timeout(5000);

    });

    await describe('Обновление товаров в каталоге', async () => {

        it('Удаляем все товары из каталога', async ()=>{

            let resp = await delAllItemFromCatalog();
            assert.notEqual(resp, -1);

        }).timeout(5000);

        it('Добавляем новые валидные товары к каталогу', async ()=>{

            let resp = await addNewValidItemIntoCatalog();

            assert.notEqual(resp, null);

            assert.ok(resp.ok);

            for(let kErr in resp.errors){
                let vErr = resp.errors[kErr];

                assert.equal(vErr, null);
            }

        }).timeout(10000);

        it('Обновляем товары в каталоге', async () => {

            let resp = await updateItemInCatalog();

            console.log(JSON.stringify(resp, null, 2));

            assert.notEqual(resp, null);

        }).timeout(15000);
    });

    await describe('Получение товаров в каталоге', async () => {

        it('Получаем товары', async () => {

            let resp = await getAllItemFromCatalog();

            assert.notEqual(resp, null);

        }).timeout(5000);
    });

    await describe('Скрытие товаров в каталоге', async () => {

        it('Скрываем товары', async () => {

            let resp = null; // товары в каталоге

            resp = await hideItemInCatalog();

            assert.notEqual(resp, null);

        }).timeout(5000);


    });

};

run();

/**
 * Проверяем наличия каталога
 */
async function ifCatalogExist():Promise<any>{
    // Получить данные каталога
    let cntCatalog = null;
    let ok = true;
    try{
        let catalogList = (await coreDBSys.raw(
            'SELECT COUNT(*) cnt FROM catalog c WHERE c.catalog_id = :catalog_id LIMIT 1',
            {catalog_id:idCatalog}
        ))[0];

        cntCatalog = catalogList[0]['cnt'];
    } catch(e){
        ok = false;
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }

    if(cntCatalog < 1){
        ok = false;
        console.log('Каталога - ', idCatalog, 'не существует');
    }

    return ok;
}


/**
 * Скрыть товары в каталоге
 */
async function hideItemInCatalog():Promise<any>{

    // Получить данные каталога
    let itemIdsList = null;
    try{
        itemIdsList = (await coreDBSys.raw(
            'SELECT i.item_id FROM item  i WHERE i.catalog_id = :catalog_id LIMIT 150',
            {catalog_id:idCatalog}
        ))[0];
    } catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }

    let itemIdsListSend = {};
    for(let k in itemIdsList){
        let v = itemIdsList[k];

        itemIdsListSend[k] = v.item_id;
    }

    let params = qs.stringify({
        catalog_id: idCatalog,
        data: JSON.stringify(itemIdsListSend)
    });

    let resp = null;
    try {
        resp = await vAxios.post(
            '/update-catalog/hide-item-in-catalog',
            params
        )
    } catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }

    if( resp ){ // Ответ
        return resp.data;
    }
}

async function getAllItemFromCatalog():Promise<any>{

    let params = qs.stringify({
        catalog_id: idCatalog
    });

    let resp = null;
    try {
        resp = await vAxios.post(
            '/update-catalog/get-item-by-catalog',
            params
        )
    } catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }

    if( resp ){ // Ответ
        return resp.data;
    }
}

/**
 * Удаление всех товаров из каталога
 */
async function delAllItemFromCatalog():Promise<any>{
    let cntDelItem = -1;
    try{
        cntDelItem = await coreDBSys('item')
            .where({
                catalog_id: idCatalog
            })
            .del();
    } catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }

    return cntDelItem;
}

/**
 * Добавление новых товаров в каталоги
 */
async function  addNewItemIntoCatalog():Promise<any>{

    // Данные
    let data:any = {};
    for(let i = 0; i < 100; i++){

        // Получаем картинки
        let itemImage = fillItemImg(i);

        // Получаем переменные
        let itemVarsAndBundle = fillItemVarsAndBundle(i);

        // Заполнить сгенерированные данные товара
        data[i] = fillItemParam(i);

        // Добавить изображения к товарам
        if( Boolean(Math.random() >= 0.5) ){
            data[i].image = itemImage; // Добавить картинки
        }

        // Добавить переменные к товарам
        if( Boolean(Math.random() >= 0.5) ){
            data[i].item_vars = itemVarsAndBundle.itemVars; // Добавить переменные
        }

        // Добавить Ряды к товарам
        if( Boolean(Math.random() >= 0.5) ){
            data[i].item_bundle = itemVarsAndBundle.itemBundle; // Добавить ряды
        }
    }

    console.log('================================');
    console.log(JSON.stringify(data, null, 2));
    console.log('================================');

    let paramsJSON:any = {};

    if( Boolean(Math.random() >= 0.1) ){ // Добавляем ID каталога
        paramsJSON.catalog_id = Boolean(Math.random() >= 0.1) ? idCatalog : 'idCatalog';
    }

    if( Boolean(Math.random() >= 0.1) ){ // Добавляем данные
        paramsJSON.data = Boolean(Math.random() >= 0.1) ? JSON.stringify(data) : data;
    }

    // console.log('Сформированные данные', JSON.stringify(paramsJSON, null, 2));

    let params = qs.stringify(paramsJSON);

    let resp = null;
    try{
        resp = await vAxios.post(
            '/update-catalog/add-item-to-catalog',
            params
        )
    }catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }

    if( resp ){ // Ответ
        return resp.data;
    }
};



/**
 * Обновление данных нового товара к каталогу
 */
async function updateItemInCatalog(): Promise<any>{

    // Получить данные каталога
    let itemIdsList = null;
    try{
        itemIdsList = (await coreDBSys.raw(
            'SELECT i.item_id FROM item  i WHERE i.catalog_id = :catalog_id LIMIT 150',
            {catalog_id:idCatalog}
        ))[0];
    } catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }

    // Данные
    let data:any = {};
    for(let i = 0; i < 100; i++){

        // Получаем картинки
        let itemImage = fillItemImg(i);

        // Получаем переменные
        let itemVarsAndBundle = fillItemVarsAndBundle(i);

        if( !itemIdsList[i] ){
            throw 'Не существует списка ID item';
        }
        if( !itemIdsList[i].item_id ){
            throw 'Не существует [i].item_id';
        }

        // Заполнить сгенерированные данные товара
        data[i] = fillItemParam(i);

        if( Boolean(Math.random() >= 0.5) ){
            data[i].item_id = Number(itemIdsList[i].item_id); // Установить ID
        }

        if( Boolean(Math.random() >= 0.5) ){
            data[i].image = itemImage; // Добавить картинки
        }

        if( Boolean(Math.random() >= 0.5) ){
            data[i].item_vars = itemVarsAndBundle.itemVars; // Добавить переменные
        }

        if( Boolean(Math.random() >= 0.5) ){
            data[i].item_bundle = itemVarsAndBundle.itemBundle; // Добавить ряды
        }

    }

    console.log('================================');
    console.log(JSON.stringify(data, null, 2));
    console.log('================================');

    let paramsJSON:any = {};

    if( Boolean(Math.random() >= 0.1) ){ // Добавляем ID каталога
        paramsJSON.catalog_id = Boolean(Math.random() >= 0.1) ? idCatalog : 'idCatalog';
    }

    if( Boolean(Math.random() >= 0.1) ){ // Добавляем данные
        paramsJSON.data = Boolean(Math.random() >= 0.1) ? JSON.stringify(data) : data;
    }

    let params = qs.stringify(paramsJSON);

    let resp = null;
    try {
        resp = await vAxios.post(
            '/update-catalog/update-item-in-catalog',
            params
        )
    } catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }



    if( resp ){ // Ответ
        return resp.data;
    }
};

/**
 * Добавление новых товаров в каталоги
 */
async function  addNewValidItemIntoCatalog():Promise<any>{

    // Данные
    let data:any = {};
    for(let i = 0; i < 100; i++){

        // Получаем картинки
        let itemImage = []; //fillItemImg(i);

        // Получаем переменные
        let itemVarsAndBundle = {itemVars:{},itemBundle:{}}; //fillItemVarsAndBundle(i);

        data[i] = {
            item_hidden: Boolean(Math.random() >= 0.5),
            item_name: "Подгузники - "+i,
            item_org_fee: Math.floor(Math.random()*20),
            item_price: Math.floor(Math.random()*10000),
            item_desc: "Описание подгузников - "+i,
            item_delivery_cost_factor: Math.round(Math.random())/100,
            image: itemImage,
            item_vars: itemVarsAndBundle.itemVars,
            item_bundle: itemVarsAndBundle.itemBundle
        };
    }

    let params = qs.stringify({
        catalog_id: idCatalog,
        data: JSON.stringify(data)
    });

    let resp = null;
    try{
        resp = await vAxios.post(
            '/update-catalog/add-item-to-catalog',
            params
        )
    }catch(e){
        console.log('Ошибка - ' + e.name , e.message, e.stack);
    }

    if( resp ){ // Ответ
        return resp.data;
    }
};


// =======================================================================

/**
 * Сгенеривароные картинки для товара
 * @param incrItem
 */
function fillItemImg(incrItem:number){
    let itemImage = [];
        let cntImageForItem = Math.floor(Math.random()*10);
        for(let j = 0; j < cntImageForItem; j++){
            itemImage.push( failImg[Math.floor(Math.random()*50)] );
        }

    return itemImage;
}

/**
 * Сгенерировать переменные и ряды к ним для товара
 * @param incrItem
 */
function fillItemVarsAndBundle(incrItem:number){

    let varItem:any = {}; // Список переменных
    let varBandle:any = {}; // Список рядов
    let cntVarsForItem = Math.floor(Math.random()*5);
    for(let j = 0; j < cntVarsForItem; j++){
        let rand = Math.floor(Math.random()*5);
        varItem[failVarsItem[rand].key] = failVarsItem[rand].val;


        // Заполняем ряды
        if(_.size(varItem) > 0){
            if( Boolean(Math.random() >= 0.5) ){
                let varBandleVal = [];

                varBandle[failVarsItem[rand].key] = [];

                let randBandleVal = Math.floor(Math.random()*_.size(varItem));
                for(let c = 0; c < rand; c++){

                    if( Boolean(Math.random() >= 0.5) ){ // Правильный ключ
                        varBandle[failVarsItem[rand].key].push(failVarsItem[rand].val[randBandleVal]);
                    } else { // Неправильный ключ
                        // varBandle[failVarsItem[rand].val[randBandleVal]].push(failVarsItem[rand].val[randBandleVal]);
                    }
                }

            }
        }
    }

    return {
        itemVars: varItem,
        itemBundle: varBandle,
    }
}

/**
 * Сгенерировать (правильные/не правильные) основные поля для товара
 * @param incrItem // Порядковый номер генерируемого ITEM
 */
function fillItemParam(incrItem:number){

    // Генерируется Цена  товара от -10000 до +10000 с плавающе точкой до 10000
    let itemPrice = Math.floor( Boolean(Math.random() >= 0.5) ? Math.random()*10000 : Math.random() * (-10000) ) / Math.random()*10000;

    // Генерировать Орг сбор от -50 до +50 целое число
    let itemOrgFre = Math.floor( Boolean(Math.random() >= 0.5) ? Math.random() * 50 : Math.random() * (-50 ) );

    //Генерироват коэфициент доставки
    let itemDeliveryCostFactor = Math.round( Math.random() * 10 )/100;

    //Генерировать булево значение - скрывать или не скрывать товар
    let itemHidden = Boolean(Math.random() >= 0.5);

    let param:any = {}


    // Скрыты или нет товар
    if( Boolean(Math.random() >= 0.5) ){
        param.item_hidden = Boolean(Math.random() >= 0.5) ? itemHidden : 'это скрытый товар';
    }

    // Наименование товара
    if( Boolean(Math.random() >= 0.1) ){
        param.item_name = Boolean(Math.random() >= 0.5) ? "Грызуны - "+incrItem : Math.random();
    }

    // Орг сбор
    if( Boolean(Math.random() >= 0.5) ){
        param.item_org_fee = itemOrgFre;
    }

    // Цена товара
    if( Boolean(Math.random() >= 0.5) ){
        param.item_price = itemPrice;
    }

    // Описание товара
    if( Boolean(Math.random() >= 0.5) ){
        param.item_desc = Boolean(Math.random() >= 0.5) ? "Описание Грызунов - "+incrItem : Math.random();
    }

    // Коэфициент доставки
    if( Boolean(Math.random() >= 0.5) ){
        param.item_delivery_cost_factor = Boolean(Math.random() >= 0.5) ? itemDeliveryCostFactor : 'Math.random()';
    };

    return param;
}
