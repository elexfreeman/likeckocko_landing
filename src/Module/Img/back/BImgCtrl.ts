import { MainRequest } from "../../Sys/MainRequest";
import { ImgUploadR } from "../ImgR";
const crypto = require('crypto');
import * as ImgS from "./ImgS";
import { BImgSql } from "./BImgSql";


export const fMd5 = (s: string): string => {
    return crypto.createHash('md5').update(s).digest("hex");;
}

/**
 * Контролер загрузки файла Express
 * 
 * @param db 
 * @param sSaveFilePath 
 */
export const faFileUploadCtrl = (db: any, sSaveFilePath: string) => {

    /**
     * Контролер загрузки файла Express
     * @param req 
     * @param resp 
     * @param next 
     */
    return async (req: MainRequest, resp: any, next: any) => {

        let bOk = true;
        let errors: any[] = [];

        const bImgSql = new BImgSql(db);

        const input: ImgUploadR.RequestI = req.body;

        const fileMd5 = fMd5(input.fileBase64);

        const fileName = fileMd5 + '.jpg';

        const img = await bImgSql.faGetImg(fileMd5);
        if (img) {
            bOk = false;
            errors.push('img exist')

        }

        if (bOk) {
            await ImgS.faSaveBase64ToFile(input.fileBase64, `${sSaveFilePath}/${fileName}`);
        }

        /* TODO: Удалить файл потом */


        resp.send({
            ok: bOk,
            data: {
                file_name: fileMd5,
            },
            errors: errors,
        });
    }

}
