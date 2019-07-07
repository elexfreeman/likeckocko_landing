// Системные сервисы
import { ErrorSys } from './ErrorSys';
import MainRequest from './MainRequest';

/**
 * Базовая модель
 */
export default class BaseM {

    public errorSys: ErrorSys;

    public req: MainRequest;

    constructor(req: MainRequest) {
        this.errorSys = req.sys.errorSys;

        this.req = req;
    }

}
