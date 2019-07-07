import {ErrorSys} from './ErrorSys';
import {ResponseSys} from './ResponseSys';

export default interface MainRequest {
    headers: { [key: string]: any };
    body: any;
    method: string;
    sys: {
        apikey: string, 
        bAuth: boolean, /* флаг авторизации */
       
        errorSys: ErrorSys,

        responseSys: ResponseSys,

    }
}