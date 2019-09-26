import { TCheckField, TValidator } from "../TValidator";
import { TVUserRegister } from "./TUser";

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

export const fVUserRegister: TVUserRegister =
    (cValidator: TValidator) =>
        (name: string) =>
            (surname: string) =>
                (phone: string) => {
                    fCheckName(cValidator)(name);
                    fCheckSurname(cValidator)(surname);
                    fCheckPhone(cValidator)(phone);
                    return cValidator.fIsOk();
                };                