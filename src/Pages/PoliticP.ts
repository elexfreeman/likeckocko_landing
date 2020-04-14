import { MainRequest } from "../Module/Sys/MainRequest";
import * as express from 'express';
import { faSendRouter } from "../Module/Sys/FResponse";
import { PoliticR as R} from "./Router"


const router = express.Router();



/**
 * Индексная страница
 */
router.get(R.sUrl,  faSendRouter(R.sTpl, async (req: MainRequest) => {
    req.seo.sTitle = 'Политика конфиденциальности'
    return {

    }
}));

export {
    router as PoliticController
}
