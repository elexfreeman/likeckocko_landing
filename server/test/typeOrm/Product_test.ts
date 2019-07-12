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

    await describe('Проверка работы ProductE', async () => {

        it('insert', async () => {

            try {
                const connection = await orm;

                /*  let product = new Product();
                 product.caption = 'Шоколадка';
                 product.img = 'gork-99-p1.jpg'; */

                let product = new Product();
                product.caption = 'Шоколадка';                
                product.img = 'gork-99-p1.jpg';
                await connection.manager.save(product);
                
                product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'gork-pl-1.jpg';
                await connection.manager.save(product);
                
                product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'majent1.jpg';
                await connection.manager.save(product);
              
                
                product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'matcha1.jpg';
                await connection.manager.save(product);
                
                product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'myta1.jpg';
                await connection.manager.save(product);
                
                product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'matcha-s-1.jpg';
                await connection.manager.save(product);
                
                product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'oblep1.jpg';
                await connection.manager.save(product);
                
                product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'rg-1.jpg';
                await connection.manager.save(product);
                
                product = new Product();
                product.caption = 'Шоколадка';
                product.img = 'yellow1.jpg';
                await connection.manager.save(product);


                assert(true);
            } catch (e) {
                console.log(e);
                assert(false);
            }

        }).timeout(3000);




    });


};

run();
