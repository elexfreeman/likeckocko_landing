import { ChockoApp } from './ChockoApp';
const config = require('./Configs/MainConfig.js');
const path = require('path');

/* Ф-я запуска приложения */
async function faRunServer() {
    console.log('Starting App...');

    let app: ChockoApp = new ChockoApp(config);
    app.fUseMySql(); // подключаем MySql
    app.fUseAAClasses()
        .fUseSeo() // используем сео модуль
        .fDisableCors() // отключаем cors
        .fUseBodyParser() // используем дефолтный BodyParser
        .fUseStatic('./public') // статические сфайлы
        .fUseViews(path.join(__dirname, '/View')) // динамические страницы
        ;

    await app.faInstall(); //  Ставим миграции

    //app = await app.faChockoAuth(); // Иницализируем модуль аторизации



    app.fChockoUseIndex() // индексная страница
        .fChockoUseProductPage() // страница товара

        // .fUseAdminUser() // Контролер администрирования пользователей
        // .fUseUserCtrl() // Контролер пользователя
        .fStart(); // Запускаем приложение

} // faRunServer

faRunServer();





