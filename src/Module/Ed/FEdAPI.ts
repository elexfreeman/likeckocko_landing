import { EdR } from "./EdR";
import { faRequestApi } from "../Sys/FCommon";


/**
 * Список единиц измерений
 */
export const faList =
    async (req: EdR.list.RequestI): Promise<EdR.list.ResponseI> =>
        await faRequestApi(EdR.list.route)(req);

