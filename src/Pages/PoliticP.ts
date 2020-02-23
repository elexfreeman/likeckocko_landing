import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import { faSendRouter } from "../Func/Sys/FResponse";
const router = express.Router();



/**
 * Индексная страница
 */
router.get('/politic',  faSendRouter('politic', async (req: MainRequest) => {
    req.seo.sTitle = 'Политика конфиденциальности'
    return {

    }
}));

export {
    router as PoliticController
}
