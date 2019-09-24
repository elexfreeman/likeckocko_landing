import { AAClasses } from '@a-a-game-studio/aa-core/lib';
import { OrderI } from './OrderE';

export class OrderDB extends AAClasses.BaseModule.BaseDB {

    /**
     * Список заказов
     */
    public async faGetList(): Promise<OrderI[]> {
        let res: OrderI[] = [];
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }
    /**
     * Список заказов пользователя
     */
    public async faGetUserOrders(userId: number): Promise<OrderI[]> {
        let res: OrderI[] = [];
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }


    /**
     * Получить product по его url
     * @param sUrl: number
     */
    public async faGetInfoByUrl(sUrl: string): Promise<OrderI> {
        let res: OrderI;
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }

    /**
     * Получить product по его id
     * @param iProducId: number
     */
    public async faGetInfo(iProducId: number): Promise<OrderI> {
        let res: OrderI;
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }


    /**
     * Вставить заказ
     * @param data 
     */
    public async faInsert(data: OrderI): Promise<number> {
        let res: number;
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }


    /**
     * Вставить заказ и товары
     * @param data 
     */
    public async faAdd(data: OrderI): Promise<number> {
        let res: number;
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }

    /**
     * Вставить продукты заказа
     * @param data 
     */
    public async faInsertOrderProducts(data: OrderI): Promise<number[]> {
        let res: number[] = [];
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }
}