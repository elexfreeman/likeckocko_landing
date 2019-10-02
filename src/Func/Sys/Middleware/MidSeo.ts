import { MainRequest } from "../MainRequest";
import { Response } from 'express';

import * as FSeo from "../FSeo";

export async function faMidSeo(request: MainRequest, response: Response, next: any) {
    request.seo = FSeo.fSeo(request.hostname, request.originalUrl);
    next();
}
