import { App, Middleware, System, User } from '@a-a-game-studio/aa-core/lib';
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
const config = require('./Configs/MainConfig.js');
const path = require('path');

import SeoMiddleware from './System/Middleware/SeoMiddleware'
import { ChockoListDBI } from './Module/ChockoListDB';

const app = new App(config)
    .fUseMySql();

/* Ф-я запуска приложения */
async function faRunServer() {
    console.log('Starting App...');

    /* модули доступа к данным */
    const listDBData: ChockoListDBI = {
        userDB: new User.UserSQL(app.errorSys, app.objDb),
        walletDB: new AAClasses.WalletModule.WalletDB(app.errorSys),
        fileDB: new AAClasses.FileModule.FileDB(app.errorSys),
    }

    const authSysMiddleware = new Middleware.AuthSysMiddleware(listDBData);
    app.objExpress.use(SeoMiddleware);

    await app.faInstall();

    app.fDisableCors() // отключаем cors
        .fUseBodyParser() // используем дефолтный BodyParser
        .fUseReddis()
        .fUseStatic('./public')
        .fUseViews(path.join(__dirname, '/View'))
        ;

    /* Иницализируем модуль аторизации */
    await app.faUseAuthSys(authSysMiddleware);

    app.fUseAdminUser() // Контролер администрирования пользователей
        .fUseUserCtrl() // Контролер пользователя
        .fStart(); // Запускаем приложение

} // faRunServer

faRunServer();





