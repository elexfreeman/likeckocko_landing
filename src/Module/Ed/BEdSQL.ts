import { db } from "../Sys/DBConnect";
import { fGetFirst, fGet2First } from "../Sys/SFunc";
import * as T from "./TEd";
export const EdTabel = 'ed';

/**
 * Список Единиц измерений
 */
export const faList = async (): Promise<T.EdI[]> => {
    const sql = `SELECT * FROM ${EdTabel} e ORDER BY e.caption`;
    const rawData = await db.raw(sql, {});
    if (!fGetFirst(rawData)) throw `${EdTabel} not found`;

    return <T.EdI[]>fGetFirst(rawData);
}

