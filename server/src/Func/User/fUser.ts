import * as TFUser from "./TUser";
import { db } from "../Sys/DBConnect";

export const fUserTable = () => 'aa_user';

export const faRegister: TFUser.TUserRegister =
    (name: string) =>
        (surname: string) =>
            async (phone: string) =>
                (await db(fUserTable())
                    .insert({
                        name: name,
                        surname: surname,
                        phone: phone,
                    }))[0];


export const faGetById: TFUser.TGetById =
    async (id: number) => {
        return (await db(fUserTable()).where('id', id))[0];;
    }

export const faCheckUserExist: TFUser.TCheckUserExist = async (id: number) => id;


