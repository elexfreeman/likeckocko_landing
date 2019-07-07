import container from "./DI";
import {AwilixContainer} from "awilix";
import {UserSys} from "./UserSys";
import {ErrorSys} from "./ErrorSys";
import {ResponseSys} from "./ResponseSys";
import MainRequest from "./MainRequest";

export class BaseController
{
    public userSys:UserSys;
    public errorSys:ErrorSys;
    public responseSys:ResponseSys;
    public DI:AwilixContainer;

    constructor(req:MainRequest)
    {
        // Инициализация системных сервисов
        this.userSys     = req.sys.userSys;
        this.errorSys    = req.sys.errorSys;
        this.responseSys = req.sys.responseSys;

        this.DI = container;
    }
}
