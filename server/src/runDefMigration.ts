import { App } from '@a-a-game-studio/aa-core/lib';
const config = require('./Configs/MainConfig.js');

const app = new App(config)
    .fUseMySql();

app.faRunDefaultMigration();





