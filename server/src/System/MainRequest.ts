import { ErrorSys } from './ErrorSys';
import { ResponseSys } from './ResponseSys';
import { Seo } from '../Components/Seo';

export default interface MainRequest {
    headers: { [key: string]: any };
    body: any;
    method: string;
    baseUrl: string;
    url: string;
    params: { [s: string]: string };
    apiUrl: string;
    sys: {
        apikey: string,
        bAuth: boolean, /* флаг авторизации */
        seo: Seo;
        errorSys: ErrorSys,

        responseSys: ResponseSys,

    }
}