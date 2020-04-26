import * as TImg from "../TImg";
import { fGetFirst } from "../../Sys/SFunc";

export const sImgTable = 'img';


export class BImgSql {
    protected db: any;

    constructor(db: any) {
        this.db = db;
    }


    /**
     * Вставить данные о файле
     * @param data 
     */
    public async faInsertTelegramFile(data: TImg.ImgI): Promise<void> {
        await this.db(sImgTable).insert(data);
    }

    /**
     * Получить данные о файле
     * @param file_name 
     */
    public async faGetImg(file_name: string): Promise<TImg.ImgI> {
        return <TImg.ImgI>fGetFirst(await this.db(sImgTable).where('file_name', file_name));
    }




}