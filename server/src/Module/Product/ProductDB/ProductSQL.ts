import { AAClasses } from '@a-a-game-studio/aa-core/lib';
import { ProductI } from './ProductE';
import { ProductDB } from './ProductDB';
import * as db from "knex";
import { ProductE } from '../../../Infrastructure/SQL/Entity/ProductE';

export class ProductSQL extends ProductDB {

    protected db: db;

    constructor(errorSys: AAClasses.Components.ErrorSys, db: db) {
        super(errorSys);
        this.db = db;
    }

    /**
     * Список товаров
     */
    public async faGetList(): Promise<ProductI[]> {
        let res: ProductI[] = [];
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT * from ${ProductE.NAME} p`;
        try {
            let result = await this.db.raw(sql, {});
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
    public async faGetInfoByUrl(sUrl: string): Promise<ProductI> {
        let res: ProductI;
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT * 
        FROM ${ProductE.NAME} p 
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
    public async faGetInfo(iProducId: number): Promise<ProductI> {
        let res: ProductI;
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT * FROM 
            ${ProductE.NAME} p 
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
}