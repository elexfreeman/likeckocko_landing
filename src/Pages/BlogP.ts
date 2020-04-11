import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import { faSendRouter } from "../Func/Sys/FResponse";
import { BlogMainR , BlogPageR } from "./Router"

const router = express.Router();


/**
 * Индексная страница
 */
router.get(BlogMainR.sUrl,  faSendRouter(BlogMainR.sTpl, async (req: MainRequest) => {
    return {
    }
}));

/**
 * страница
 */
router.get(BlogPageR.sUrl,  faSendRouter(BlogPageR.sTpl, async (req: MainRequest) => {
    return {
    }
}));

export {
    router as BlogController
}
