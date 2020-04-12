import * as TProduct from "./TProduct";
import { db } from "../Sys/DBConnect";
import { fGetFirst, fGet2First } from "../Sys/SFunc";
export const ProductTabel = 'products';
export const ProductCategoryTabel = 'product_category';

/**
 * Список товаров
 */
export const faList: TProduct.TList = async () => {
    let sql = `SELECT * FROM ${ProductTabel} p`;
    const rawData = await db.raw(sql, {});
    if (!fGetFirst(rawData)) throw 'Products not found';

    return <TProduct.ProductI[]>fGetFirst(rawData)
        .map((product: TProduct.ProductI) => fProcessBgIg(product));
}

/**
 * Список товаров
 */
export const faListByCategoryId = async (categoryId: number): Promise<TProduct.ProductI[]> => {
    let sql = `SELECT p.* FROM ${ProductTabel} p
    JOIN ${ProductCategoryTabel} pc
    ON pc.product_id=p.id
    where pc.category_id=:category_id
    `;
    const rawData = await db.raw(sql, { category_id: categoryId });
    if (!fGetFirst(rawData)) throw 'Products not found';

    return <TProduct.ProductI[]>fGetFirst(rawData)
        .map((product: TProduct.ProductI) => fProcessBgIg(product));
}

export const faByUrl = async (sUrl: string): Promise<TProduct.ProductI> => {
    let sql = `SELECT * 
        FROM ${ProductTabel} p 
        WHERE p.url = :sUrl 
        LIMIT 1`;
    const rawData = await db.raw(sql, {
        sUrl: sUrl
    });
    if (!fGet2First(rawData)) throw 'faByUrl: Product not found';

    return <TProduct.ProductI>fProcessBgIg(fGet2First(rawData))
}

/**
 * обработка BgImg
 * @param product 
 */
export const fProcessBgIg = (product: TProduct.ProductI) => {
    if (product.img) {
        const tmp = product.img.split('.');
        product.bgImg = tmp[0] + '_b.' + tmp[1];
    } else {
        product.bgImg = '';;
    }

    return product
}

