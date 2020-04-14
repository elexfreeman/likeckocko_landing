import store from '../../frontend/app/AppVuex';
import * as FFUser from './FFUser';
import { UserI } from './TUser';
import { FBaseController } from '../Sys/FBaseController';


/**
 * Работа с клиеном
 */
export class UserController extends FBaseController {

    public onChangeUser(user: UserI) {
        this.store.commit('setUser', user);
        FFUser.fSave(user);
    }

}


