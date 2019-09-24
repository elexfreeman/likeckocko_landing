declare var global: any;
import * as mocha from 'mocha';
import { assert } from 'chai';
import { ChockoApp } from '../../../src/ChockoApp';
import { OrderI } from '../../../src/Module/Order/OrderDB/OrderE';
import { Order } from '../../../src/Module/Order/Order';
import { OrderProductI } from '../../../src/Module/Order/OrderDB/OrderE';
import { User } from '@a-a-game-studio/aa-classes/lib/User/User';
import { ChockoListDB, ChockoListDBI } from '../../../src/Module/ChockoListDB';
import { OrderDB } from '../../../src/Module/Order/OrderDB/OrderDB';
import { UserI } from '@a-a-game-studio/aa-classes/lib/User/UserModule';
const config = require('../../../src/Configs/MainConfig.js');


const run = async () => {

    let app: ChockoApp = new ChockoApp(config);
    app.fUseMySql(); // подключаем MySql
    app.fUseAAClasses();

    await mocha.describe('Проверка работы OrderSQL', async () => {

        mocha.it('list', async () => {
            let listDB: ChockoListDBI = app.fGetListDB();

            let user = new User(app.errorSys, new ChockoListDB(listDB));
            let order = new Order(app.errorSys, new ChockoListDB(listDB));

            let userData: UserI = {
                name: 'John',
                surname: 'Shepard',
                phone: '89656554687',
            }

            let orderProducts: OrderProductI[] = [
                {
                    count: 10,
                    price: 10,
                    product_id: 10,
                },
                {
                    count: 22,
                    price: 22,
                    product_id: 2,
                },
            ];


            let orderData: OrderI = {
                city: 'city',
                delivery_address: 'delivery_address',
                comment: 'comment',
                delivery_time_comment: 'delivery_time_comment',
                products: orderProducts
            }

            let resp = await order
                .actions
                .сreateA
                .faCreate(userData, orderData);

                console.log(app.errorSys.getErrors());
                

            assert.ok(resp > 0);


        }).timeout(3000);

    });
};

run();
