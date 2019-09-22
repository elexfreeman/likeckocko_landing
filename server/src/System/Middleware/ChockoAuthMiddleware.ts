import { Middleware } from '@a-a-game-studio/aa-core/lib';
import { ChockoListDB, ChockoListDBI } from '../../Module/ChockoListDB';

export class ChockoAuthMiddleware extends Middleware.AuthSysMiddleware {

    /**
        * Ф-я подключения ListDB
        * ее стоит преопределять когда наследуешь класс ListDB
        * @param req 
        */
    protected fInitListDB(): ChockoListDB {
        return new ChockoListDB(<ChockoListDBI>this.listDBData);
    }
}