import * as TUser from "./TUser";
import { TValidator } from '../TValidator';

/**
 * Дефлтный пользователь
 */
export const fDefault = (): TUser.UserI => {
    const user: TUser.UserI = {
        name: '',
        phone: '',
    };
    return fSave(user);
}

/**
 * Получить текущего юзера
 */
export const fGet = () => {
    try {
        const user: TUser.UserI = <TUser.UserI>JSON.parse(localStorage.getItem('user'));
        if (!user) throw 'error localStorage';

        const cV = new TValidator();

        cV.fSetData(user.name)
            .fDefault('');

        cV.fSetData(user.phone)
            .fDefault('');

        return user;

    } catch (e) {
        console.log('Empty user');
    }

    return fDefault();
};

/**
 * сохранить заказ в кэш
 * @param user 
 */
export const fSave = (user: TUser.UserI): TUser.UserI => {
    localStorage.setItem('user', JSON.stringify(user))
    return user;
};

/* ************************** */
/* ф-и измнения */
/* ************************** */


export const fChangeName =
    (user: TUser.UserI) =>
        (sName: string): TUser.UserI => {
            user.name = sName;
            return user;
        };

export const fChangeComment =
    (user: TUser.UserI) =>
        (sPhone: string): TUser.UserI => {
            user.phone = sPhone;
            return user;
        };

