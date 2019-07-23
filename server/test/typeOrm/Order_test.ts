process.env.TS_NODE_PROJECT = './tsconfig.json';
// process.env.TS_CONFIG_PATHS = 'true';
const mocha = require('ts-mocha');

const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

import { Product } from '../../src/Infrastructure/typeOrm/Entity/Product';
import { OrderProduct } from '../../src/Infrastructure/typeOrm/Entity/OrderProduct';
import { Order } from '../../src/Infrastructure/typeOrm/Entity/Order';
import { User } from '../../src/Infrastructure/typeOrm/Entity/User';

import orm from '../../src/Infrastructure/typeOrm/Connect';

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * API для обновления каталогов
 */
const run = async () => {

    await describe('Проверка работы Order', async () => {

        it('insert', async () => {

            try {
                const connection = await orm;

                /* создаетм юзера */
                let user = new User();
                user.name = 'John';
                user.phone = '123456789';
                await connection.manager.save(user);

                /* создаем заказ юзера */
                let order = new Order();
                order.comment = 'comment';
                order.user = user;
                await connection.manager.save(order);

                /* ищем продукты в DB */
                let products = await connection.manager.findByIds(Product, [1, 2, 3]);

                


                /* Соддаем список продуктов заказа */
                let orderProducts: OrderProduct[] = [];

                for (let i = 0; i < products.length; i++) {
                    let orderProduct = new OrderProduct();
                    orderProduct.product = products[i];
                    orderProduct.order = order;
                    orderProduct.price = products[i].price;
                    orderProducts.push(orderProduct);
                }

                await connection.manager.save(orderProducts);

                let testOrder = await connection.manager.findOne(Order, order.id);

                console.log(testOrder);





                assert(true);
            } catch (e) {
                console.log(e);
                assert(false);
            }

        }).timeout(3000);




    });


};

run();
