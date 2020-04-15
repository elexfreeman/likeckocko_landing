import { ReceiptR } from "./ReceiptR";
import { faRequestApi } from "../Sys/FCommon";


/**
 * Список единиц измерений
 */
export const faList =
    async (req: ReceiptR.list.RequestI): Promise<ReceiptR.list.ResponseI> =>
        await faRequestApi(ReceiptR.list.route)(req);

