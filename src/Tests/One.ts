export interface ErrorsI {
    [key: string]: { [key: string]: boolean }
}

/**
 * Проверяет есть ли ошибки для данного поля
 * @param errors 
 */
export const fHasError =
    (errors: ErrorsI) =>
        (sField: string): boolean => {
            let resp = false;
            const aKeys = Object.keys(errors[sField]);
            for (let i = 0; i < aKeys.length; i++) {
                if (errors[sField][aKeys[i]]) {
                    resp = true;
                    break;
                }
            }
            return resp;
        }



function main() {
    let e: ErrorsI = {
        err1: {
            a:true,
            b: false,
        }
    }
    console.log(fHasError(e));
    
}   

main();