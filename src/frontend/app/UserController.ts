import store from './AppVuex';
import * as FFUser from '../../Func/User/FFUser';
import { UserI } from '../../Func/User/TUser';


/**
 * Работа с клиеном
 */
export class UserController {

    public onChangeUser(user: UserI) {
        store.commit('setUser', user);
        FFUser.fSave(user);
    }

}


