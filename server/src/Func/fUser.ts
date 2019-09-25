import * as TFUser from "./TUser";
import { TCheckField, TValidator } from "./TValidator";
import { db } from "./Sys/DBConnect";

export const fUserTable = () => 'aa_user';

/* проверка полей */
/* Имя */
export const fCheckName: TCheckField =
    (cValidator: TValidator) =>
        (sValue: string) =>
            cValidator
                .fSetErrorString('name')
                .fSetData(sValue)
                .fExist()
                .fText()
                .fMinLen(3);

/* фамилия */
export const fCheckSurname: TCheckField =
    (cValidator: TValidator) =>
        (sValue: string) =>
            cValidator
                .fSetErrorString('surname')
                .fSetData(sValue)
                .fExist()
                .fText()
                .fMinLen(3);

/* телефон */
export const fCheckPhone: TCheckField =
    (cValidator: TValidator) =>
        (sValue: string) =>
            cValidator
                .fSetErrorString('phone')
                .fSetData(sValue)
                .fExist()
                .fText()
                .fMinLen(3);


export const faRegister: TFUser.TUserRegister =
    (cValidator: TValidator) =>
        (name: string) =>
            (surname: string) =>
                async (phone: string) => {
                    /* выполняем проверки */
                    fCheckName(cValidator)(name);
                    fCheckSurname(cValidator)(surname);
                    fCheckPhone(cValidator)(phone);
                    cValidator.fProcess();
                    // Returns [1]
                    return (await db(fUserTable())
                        .insert({
                            name: name,
                            surname: surname,
                            phone: phone,
                        }))[0];
                };

export const faGetById: TFUser.TGetById =
    async (id: number) => {
        let user: TFUser.UserI = <TFUser.UserI>(await db(fUserTable()).where('id', id))[0];

        if (!user) throw {'userIsNotExist': true};
        return user;
    }

export const faCheckUserExist: TFUser.TCheckUserExist = async (id: number) => id;


