import { ChockoApp } from './ChockoApp';
const config = require('./Configs/MainConfig.js');
const path = require('path');

/* Ф-я запуска приложения */
async function faRunServer() {

    let app: ChockoApp = new ChockoApp(config);
    app.fUseMySql();
    app.fInitDB()
        .fUseSeo();

    console.log('Starting App...');

    /* Ставим миграции */
    await app.faInstall();

    app.fDisableCors() // отключаем cors
        .fUseBodyParser() // используем дефолтный BodyParser
        .fUseReddis()
        .fUseStatic('./public')
        .fUseViews(path.join(__dirname, '/View'))
        ;

    /* Иницализируем модуль аторизации */
    app = await app.faChockoAuth();

    app
        .fChockoUseIndex()
        .fUseAdminUser() // Контролер администрирования пользователей
        .fUseUserCtrl() // Контролер пользователя
        .fStart(); // Запускаем приложение

} // faRunServer

faRunServer();





