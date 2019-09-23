import { AAClasses } from '@a-a-game-studio/aa-core/lib';
import { OrderI, OrderE } from './OrderE';
import { OrderDB } from './OrderDB';
import * as db from "knex";

export class OrderSQL extends OrderDB {

    protected db: db;
    public orderE: OrderE;


    constructor(errorSys: AAClasses.Components.ErrorSys, db: db) {
        super(errorSys);
        this.db = db;
        this.orderE = new OrderE();
    }


    /**
     * Список заказов
     */
    public async faGetList(): Promise<OrderI[]> {
        let res: OrderI[] = [];
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT * from ${OrderE.NAME} o
            ORDER BY o.create_at DESC
        `;
        try {
            let result = await this.db.raw(sql, {});
            res = result[0];
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return res;
    }

    /**
     * Список заказов пользователя
     */
    public async faGetUserOrders(userId: number): Promise<OrderI[]> {
        let res: OrderI[] = [];
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT * from ${OrderE.NAME} o
            WHERE o.user_id = :userId ORDER BY o.create_at DESC
        `;
        try {
            let result = await this.db.raw(sql, { userId: userId });
            res = result[0];
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return res;
    }




    /**
     * Получить product по его url
     * @param sUrl: string
     */
    public async faGetInfoByUrl(sUrl: string): Promise<OrderI> {
        let res: OrderI;
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT * 
        FROM ${OrderE.NAME} p 
        WHERE p.url = :sUrl 
        LIMIT 1`;
        try {
            let result = await this.db.raw(sql, {
                sUrl: sUrl
            });

            res = result[0][0];
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return res;
    }

    /**
     * Получить product по его id
     * @param iProducId: number
     */
    public async faGetInfo(iProducId: number): Promise<OrderI> {
        let res: OrderI;
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT * FROM 
            ${OrderE.NAME} p 
        WHERE p.id = :iProducId  
        LIMIT 1`;
        try {
            let result = await this.db.raw(sql, {
                iProducId: iProducId
            });
            res = result[0][0];
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return res;
    }

    /**
     * Вставить заказ
     * @param data 
     */
    public async faInsert(data: OrderI): Promise<number> {
        const errorString = this.fClassName() + '.' + this.fMethodName();
        let orderId;

        if (!this.modelValidatorSys.fValid(this.orderE.getRulesInsert(), data)) {
            throw 'validation error';
        }

        try {
            let d = await this.db(OrderE.NAME)
                .insert(this.modelValidatorSys.getResult());

            orderId = d[0];
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return orderId;
    }


    /**
    * Вставить продукты заказа
    * @param data 
    */
    public async faInsertOrderProducts(data: OrderI): Promise<number[]> {
        let res: number[] = [];
        const errorString = this.fClassName() + '.' + this.fMethodName();

        try {
            if (data.products.length > 0) {
                for (let i = 0; i < data.products.length; i++) {
                    let d = await this.db(OrderE.NAME)
                        .insert({
                            price: data.products[i].price,
                            count: data.products[i].count,
                            product_id: data.products[i].product_id,
                            order_id: data.products[i].order_id,
                        });

                    res.push(d[0]);
                }
            }
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return res;
    }

}