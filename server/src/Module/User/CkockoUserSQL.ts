import { UserSQL } from "@a-a-game-studio/aa-core/lib/Namespace/User";
import { UserI, UserE } from "@a-a-game-studio/aa-classes/lib/User/UserModule";

export class CkockoUserSQL extends UserSQL {

    public async faInsert(data: UserI): Promise<UserI> {
        const errorString = this.fClassName() + '.' + this.fMethodName();

        try {
            data['login'] = data.phone;
            data['email'] = '';
            data['pswd'] = '';

            let d = await this.db(UserE.NAME)
                .insert(data);

            if (!d) {
                throw 'err insert';
            }

            data.id = d[0];

        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return data;

    };


    public async faGetInfoByLogin(sLogin: string): Promise<UserI>{
        let res: UserI;
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let sql = `SELECT u.* FROM ${UserE.NAME} u
            WHERE u.login = :sLogin LIMIT 1`;

        try {
            let result = await this.db.raw(sql, {
                'sLogin': sLogin,
            });
            res = result[0][0];
        } catch (e) {
            this.errorSys.error(errorString, String(e));
        }

        return res;
    }

}