import { AAClasses, User } from '@a-a-game-studio/aa-core/lib'
import { Order } from '../Order';
import { FieldValidator } from '@a-a-game-studio/aa-components/lib';
import { OrderI } from '../OrderDB/OrderE';

/**
 * Создание заказа
 */
export class CreateA extends AAClasses.BaseModule.BaseActions {

    public object: Order;


    /**
     * создать заказ
     * @param order 
     */
    public async faCreate(user: AAClasses.UserModule.UserI, order: OrderI): Promise<number> {
        let orderId: number;
        let userId: number;
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let fV = new FieldValidator(this.object.errorSys, true);


        fV.fSetData(user) // клиент
            .fSetErrorString(errorString + '.user')
            .fExist();

        fV.fSetData(order) // заказ
            .fSetErrorString(errorString + '.order')
            .fExist();

        fV.fDoIfOk(() => { // клиент поля
            fV.fSetData(user.name)
                .fSetErrorString(errorString + '.user.name')
                .fExist()
                .fText()
                .fMinLen(3)

                .fSetData(user.phone)
                .fSetErrorString(errorString + '.user.phone')
                .fExist()
                .fMinLen(5);
        });

        fV.fDoIfOk(() => { // заказ 
            fV.fSetData(order.delivery_address)
                .fSetErrorString(errorString + '.order.delivery_address')
                .fExist()
                .fMinLen(5);
        });


        fV.fDoIfOk(() => { // заказ продукты
            fV.fSetData(order.products)
                .fSetErrorString(errorString + '.order.products')
                .fExist()
                .fMinLen(1);
        });

        fV.fDoIfOk(() => {
            for (let i = 0; i < order.products.length; i++) {
                fV
                    .fSetData(order.products[i].count)
                    .fSetErrorString(errorString + '.order.products.' + i + '.count')
                    .fExist()
                    .fInt()
                    .fMore(0)

                    .fSetData(order.products[i].product_id)
                    .fSetErrorString(errorString + '.order.products.' + i + '.count')
                    .fExist()
                    .fInt()
                    .fMore(0);
            }
        });

        let userData: AAClasses.UserModule.UserI = await fV.faDoIfOkAsync(async () =>
            await this.object.listDB.userDB.faGetInfoByLogin(user.phone)
        );

        if (userData) {
            userId = userData.id;
        } else {
            userId = await fV.faDoIfOkAsync(async () => {
                /* вставляем пользователя */
                let newUser = await this.object.listDB.userDB.faInsert(user)
                return newUser.id;
            });
        }

        orderId = await fV.faDoIfOkAsync(async () => {
            /* вставляем заказ */
            order.user_id = userId;
            return await this.object.listDB.orderDB.faAdd(order)
        });


        return orderId;
    }

}