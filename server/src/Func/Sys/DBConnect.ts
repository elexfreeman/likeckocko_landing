import * as knex from "knex";
const config = require('../../Configs/MainConfig.js');
export const db = knex(config.mysql);