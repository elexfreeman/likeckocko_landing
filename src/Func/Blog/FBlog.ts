import * as TBlog from "./TBlog";
import { db } from "../Sys/DBConnect";
import { fGetFirst, fGet2First } from "../Sys/SFunc";
export const BlogTabel = 'blog_page';

/**
 * Список товаров
 */
export const faList = async (): Promise<TBlog.BlogI[]> => {
    const sql = `SELECT * FROM ${BlogTabel} b`;
    const rawData = await db.raw(sql, {});

    if (!fGetFirst(rawData)) throw 'Blog not found';

    return <TBlog.BlogI[]>fGetFirst(rawData);
}


export const faById = async (id: number): Promise<TBlog.BlogI> => {
    let sql = `SELECT * 
        FROM ${BlogTabel}  b
        WHERE b.id = :id 
        LIMIT 1`;
    const rawData = await db.raw(sql, {
        id: id
    });
    if (!fGet2First(rawData)) throw 'blog.faById: blog not found';

    return <TBlog.BlogI>fGet2First(rawData);
}