import BaseSQL from '../../../System/BaseSQL';
import { ProductE } from '../Entity/ProductE';

/**
 * Здесь методы для SQL запросов
 */
export class ProductSQL extends BaseSQL {


       /**
     * Список товаров
     * @param iOffset 
     * @param iLimit 
     * @param aFilter 
     */
    public async list(iOffset: number, iLimit: number, aFilter: { [key: string]: any }): Promise<ProductE[]> {
       
        let resp = null;
        let sql = '';
     
        sql = `
            SELECT *
            FROM `+ ProductE.NAME + ` p
            
            ORDER by p.caption                        
            LIMIT :offset, :limit
            ;
        `;

        try {
            resp = (await this.db.raw(sql, {
                'offset': iOffset,
                'limit': iLimit
            }))[0];

        } catch (e) {            
            console.log('ProductSQL');
            console.log(e);
        }

        return resp;
    }


}
