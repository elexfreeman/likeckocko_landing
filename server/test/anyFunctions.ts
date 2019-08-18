const iconv = require('iconv-lite');

import * as fs from "fs";

/**
 * promise read file
 * @param file - file path
 */
export function readFile(file: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(file, function (err: any, data: any) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}






/**
 * Win --> Utf8
 */
export function winToUtf8(buf: any): string {
    return iconv.decode(Buffer.from(buf, 'binary'), 'cp1251').toString();
}










export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}
