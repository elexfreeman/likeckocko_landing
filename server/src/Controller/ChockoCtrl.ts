const express = require('express');
const router = express.Router();

import { BaseCtrl } from '@a-a-game-studio/aa-core/lib/Namespace/System';
import { MainRequest } from '@a-a-game-studio/aa-core/lib/System/MainRequest';
import { Product } from '../Module/Product/Product';
import { ChockoListDB } from '../Module/ChockoListDB';
import { ChockoConfI } from '../Module/ConfigI';

/**
 * Контроллер 
 */
export class ChockoCtrl extends BaseCtrl {
    public conf: ChockoConfI;
    protected listDB: ChockoListDB;

    constructor(req: MainRequest, resp: any) {
        super(req, resp);
        this.conf = <ChockoConfI>this.req.conf;
        this.listDB =  <ChockoListDB>this.req.sys.userSys.listDB;
        
    }

}
