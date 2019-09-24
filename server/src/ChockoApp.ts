import { App, System } from '@a-a-game-studio/aa-core/lib';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';

import { SeoMiddleware } from './System/Middleware/SeoMiddleware'
import { ChockoListDBI, ChockoListDB } from './Module/ChockoListDB';
import { ProductSQL } from './Module/Product/ProductDB/ProductSQL';
import { ChockoConfI } from './Module/ConfigI';

import { IndexController } from './Controller/IndexController';
import { ProductController } from './Controller/ProductController';
import { OrderSQL } from './Module/Order/OrderDB/OrderSQL';
import { CkockoUserSQL } from './Module/User/CkockoUserSQL';

export class ChockoApp extends App {

    protected listDBData: ChockoListDBI;
    protected listDB: ChockoListDB;

    constructor(conf: ChockoConfI, iPort?: number) {
        super(conf, iPort)
    }


    public fGetListDBData(): ChockoListDBI {
        return this.listDBData;
    }

    public fGetListDB(): ChockoListDB {
        return this.listDB;
    }

    /**
     * использовать AAClasses
     * */
    public fUseAAClasses(): ChockoApp {
        /* TODO: переделать на fInitAACLasses эту часть */
        if (!this.bUseMySql) throw 'MySql is not use';
        /* модули доступа к данным */
        this.listDBData = {
            userDB: new CkockoUserSQL(this.errorSys, this.objDb),
            walletDB: new AAClasses.WalletModule.WalletDB(this.errorSys),
            fileDB: new AAClasses.FileModule.FileDB(this.errorSys),
            orderDB: new OrderSQL(this.errorSys, this.objDb),
            productDB: new ProductSQL(this.errorSys, this.objDb),
        }

        this.listDB = new ChockoListDB(this.listDBData);

        /* Подключаем конфиг */
        this.objExpress.use((req: System.MainRequest.MainRequest, resp: any, next: any) => {
            req.listDB = this.listDB;
            next();
        }); // уст. конфиг

        this.bUseAAClasses = true;


        return this;
    }


    /* использовать seo */
    public fUseSeo(): ChockoApp {
        this.objExpress.use(SeoMiddleware);
        return this;
    }

    /**
     * Использовать Index page
     */
    public fChockoUseIndex(): ChockoApp {
        this.objExpress.use(IndexController);
        return this;
    }

    /**
     * Использвать страницу продукта
     */
    public fChockoUseProductPage(): ChockoApp {
        this.objExpress.use(ProductController);
        return this;
    }
}