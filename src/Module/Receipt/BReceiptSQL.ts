import { db } from "../Sys/DBConnect";
import { fGetFirst, fGet2First } from "../Sys/SFunc";
import * as T from "./TReceipt";
export const RecieptTabel = 'receipt';


/**
 * Список 
 */
export const faList = async (): Promise<T.ReceiptI[]> => {
    const sql = `SELECT * FROM ${RecieptTabel} e ORDER BY e.caption limit 10`;
    const rawData = await db.raw(sql, {});
    if (!fGetFirst(rawData)) throw `${RecieptTabel} faList: not found`;

    return <T.ReceiptI[]>fGetFirst(rawData);
}


/**
 * Получить по id
 * @param id 
 */
export const faGetById = async (id: number): Promise<T.ReceiptI> => {
    const sql = `SELECT * FROM ${RecieptTabel} where id=:id e limit 1`;
    const rawData = await db.raw(sql, {id: id});
    if (!fGet2First(rawData)) throw `${RecieptTabel} faGetById: not found`;
    return <T.ReceiptI>fGet2First(rawData);
}
