import { ErrorsI } from "../TValidator";

export interface ResponseI {
    ok: boolean,
    errors: ErrorsI,
    data: any,
    msg: any,
}

export const fResponse =
    (ok: boolean) =>
        (errors: ErrorsI) =>
            (data: any) =>
                (msg: any): ResponseI => {
                    return {
                        ok: ok,
                        errors: errors,
                        data: data,
                        msg: msg,
                    }
                }