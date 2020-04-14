import * as express from 'express';
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

import { MidReq } from "./Module/Sys/Middleware/MidReq";
import { faMidSeo } from './Module/Sys/Middleware/MidSeo';

export const fApp =
    (app: express.Express) =>
        (bUseCors: boolean) =>
            (bUseBodyParser: boolean) =>
                (bUseStatic: boolean) =>
                    (bUseViews: boolean): express.Express => {
                        if (bUseCors) {
                            /*для подкл к API*/
                            app.use(cors());
                            app.options('*', cors());
                        }
                        if (bUseBodyParser) {
                            app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
                            app.use(bodyParser.json());
                        }
                        if (bUseStatic) {
                            app.use(express.static('./public'));
                        }
                        if (bUseViews) {
                            app.set('views', path.join(__dirname, '/View'));
                            app.set('view engine', 'ejs');
                        }

                        app.use(MidReq);
                        app.use(faMidSeo);
                        return app;
                    }
