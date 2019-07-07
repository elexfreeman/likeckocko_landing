import config from '../Configs/config';

const coreDBSys = require('knex')(config.mysql);
/**
 * SQL Запросы
 */
export default class BaseSQL {

    protected db: any;

    constructor() {
        this.db = coreDBSys;
    }

}
