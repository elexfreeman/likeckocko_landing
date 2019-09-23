import { App, User } from '@a-a-game-studio/aa-core/lib';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';

import { SeoMiddleware } from './System/Middleware/SeoMiddleware'
import { ChockoListDBI } from './Module/ChockoListDB';
import { ProductSQL } from './Module/Product/ProductDB/ProductSQL';
import { ChockoConfI } from './Module/ConfigI';
import { ChockoAuthMiddleware } from './System/Middleware/ChockoAuthMiddleware';

import { IndexController } from './Controller/IndexController';
import { ProductController } from './Controller/ProductController';
import { OrderSQL } from './Module/Order/OrderDB/OrderSQL';

export class ChockoApp extends App {

    protected listDBData: ChockoListDBI;

    constructor(conf: ChockoConfI, iPort?: number) {
        super(conf, iPort)
    }

    public fInitDB(): ChockoApp {
        /* модули доступа к данным */
        this.listDBData = {
            userDB: new User.UserSQL(this.errorSys, this.objDb),
            walletDB: new AAClasses.WalletModule.WalletDB(this.errorSys),
            fileDB: new AAClasses.FileModule.FileDB(this.errorSys),
            productDB: new ProductSQL(this.errorSys, this.objDb),
            orderDB: new OrderSQL(this.errorSys, this.objDb)
        }
        return this;
    }


    public async faChockoAuth(): Promise<ChockoApp> {
        if (!this.listDBData) {
            console.log('listDBData is empty');
            process.exit(1);
        }
        const authSysMiddleware = new ChockoAuthMiddleware(this.listDBData);
        await this.faUseAuthSys(authSysMiddleware);

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