import MainRequest from '../System/MainRequest';
import orm from "../Infrastructure/typeOrm/Connect";

/**
 * Контроллер 
 */
export default class BaseController {

    protected req: any;
    protected resp: any;

    protected connection: any; // подключение к DB

    constructor(req: MainRequest, resp: any) {        
        this.req = req;
        this.resp = resp;
    }

    static async Init(req: MainRequest, resp: any): Promise<BaseController> {
        let self = new this(req, resp);
        self.connection = await orm;
        return self;
    }


}
