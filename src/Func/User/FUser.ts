import * as TUser from "./TUser";
import { db } from "../Sys/DBConnect";

export const fUserTable = () => 'aa_user';

export const faRegister: TUser.TUserRegister =
    (name: string) =>
        (surname: string) =>
            async (phone: string) =>
                (await db(fUserTable())
                    .insert({
                        name: name,
                        surname: surname,
                        phone: phone,
                    }))[0];

export const faUserId =
    (id: number) =>
        async (fnc: Function) => await fnc(id);

export const faGetById: TUser.TGetById =
    async (id: number) => {
        return (await db(fUserTable()).where('id', id))[0];;
    }

export const faCheckUserExist: TUser.TCheckUserExist = async (id: number) => id;


