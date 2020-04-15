import { EdI } from "./TEd";
import { BaseApiI } from "../Sys/BaseApi";

export namespace EdR  {

    /* Список единиц измерений */
    export namespace list {
        export const route = "/api/ed/list";

        /* запрос */
        export interface RequestI {

        }

        /* ответ */
        export interface ResponseI extends BaseApiI {
            data: DataI;
        }

        export interface DataI {
            list: EdI[];
        }

    }
}