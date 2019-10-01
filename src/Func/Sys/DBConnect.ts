import * as knex from "knex";
import * as Config from '../Config/Config'

export const db = knex(Config.mysql);