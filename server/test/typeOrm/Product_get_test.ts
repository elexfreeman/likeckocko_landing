process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');


const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;
import { Product } from '../../src/Infrastructure/typeOrm/Entity/Product';
import orm from '../../src/Infrastructure/typeOrm/Connect';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * API для обновления каталогов
 */
const run = async () => {

    await describe('Проверка работы Product', async () => {

        it('get', async () => {

            try {
                const connection = await orm;

                /*  let product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'gork-99-p1.jpg'; */

                let product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'gork-99-p1.jpg';
                product.url = 'product_url' + getRandomInt(1, 10000);
                await connection.manager.save(product);                

                let testP = await connection.manager.findOne(Product, { url: 'a' });
                console.log(testP);
                assert(!testP);
            } catch (e) {
                console.log(e);
                assert(false);
            }

        }).timeout(3000);




    });


};

run();
