import { ReceiptI } from "./TReceipt";
import { BaseApiI } from "../Sys/BaseApi";

export namespace ReceiptR  {

    /* Список единиц измерений */
    export namespace list {
        export const route = "/api/receipt/list";

        /* запрос */
        export interface RequestI {

        }

        /* ответ */
        export interface ResponseI extends BaseApiI {
            data: DataI;
        }

        export interface DataI {
            list: ReceiptI[];
        }
    }

    /* по ID */
    export namespace getById {
        export const route = "/api/receipt/getById";

        /* запрос */
        export interface RequestI {
            id: number;
        }

        /* ответ */
        export interface ResponseI extends BaseApiI {
            data: DataI;
        }

        export interface DataI {
            item: ReceiptI;
        }
    }

    /* по URL */
    export namespace getByUrl {

        export const route = "/receipt/:url";

        /* запрос */
        export interface RequestI {
            url: string;
        }

        /* ответ */
        export interface ResponseI extends BaseApiI {
            data: DataI;
        }

        export interface DataI {
            
        }
    }
}