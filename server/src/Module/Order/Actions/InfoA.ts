import { AAClasses, User } from '@a-a-game-studio/aa-core/lib'
import { Order } from '../Order';
import { FieldValidator } from '@a-a-game-studio/aa-components/lib';
import { OrderI } from '../OrderDB/OrderE';

/**
 * Информация о товаре
 */
export class InfoA extends AAClasses.BaseModule.BaseActions {

    public object: Order;

    /**
     * Информация о продукте по id
     * @param iOrderId 
     */
    public async faGetInfo(iOrderId: number): Promise<void> {
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let fV = new FieldValidator(this.object.errorSys, iOrderId)
            .fSetErrorString(errorString)
            .fExist()
            .fInt()
            .fMore(0);

        this.object = await fV.faDoIfOkAsync(async () =>
            Order.Init(
                this.object.errorSys,
                await this.object.listDB.orderDB.faGetInfo(iOrderId)
                , this.object.listDB
            )
        );
    }

    /**
   * Список заказов
   */
    public async faGetList(): Promise<Order[]> {

        let resp: Order[] = []
        let data = await this.object.listDB.orderDB.faGetList();
        for (let i = 0; i < data.length; i++) {
            resp.push(Order.Init(
                this.object.errorSys,
                data[i]
                , this.object.listDB
            ))
        }
        return resp;
    }

    /**
   * Список заказов
   */
    public async faGetUserOrders(user: AAClasses.UserModule.User): Promise<OrderI[]> {
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let resp: OrderI[] = [];
        let fV = new FieldValidator(this.object.errorSys, user.data.id)
            .fSetErrorString(errorString + '.userId')
            .fExist()
            .fMore(0);

        resp = await fV.faDoIfOkAsync(async () => {
            return await this.object
                .listDB
                .orderDB
                .faGetUserOrders(user.data.id);
        });

        return resp;
    }

    /**
     * Вставить заказ с товарами
     * @param order 
     */
    public async faInsert(order: OrderI): Promise<boolean> {
        let resp = false;


        return resp;
    }




}