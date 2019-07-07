// Update with your config settings.

// Конфиг для настройки миграций в старой MySQL базе данных

let mysqlConf = require('./src/Configs/mysql.json');

module.exports = {

    development: mysqlConf,

    staging: mysqlConf,

    production: mysqlConf

};
