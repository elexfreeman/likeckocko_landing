import { TValidator } from "./TValidator";

export interface UserI {
    id?: number;
    phone?: string;
    name?: string;
    surname?: string;
    currency_id?: number;
    patronymic?: string;
    create_date?: string;
    email?: string;
    birthday?: string;
    avatar?: string;
    city?: string;
    pswd?: string;
    login?: string;
    token?: string;
    hash?: string;
}

export type TGetById = (id: number) => Promise<UserI>;

export type TCheckUserExist = (id: number) => Promise<number>;

export type TUserRegister =
    (cValidator: TValidator) =>
        (name: string) =>
            (surname: string) =>
                (phone: string) => Promise<number>;
