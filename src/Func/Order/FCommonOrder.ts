import * as SFunc from "../Sys/SFunc";

import * as TFOrder from "./TOrder";

export const fCalcOrderTotalSumm: TFOrder.TCalcOrderTotalSumm =
(aProducts: TFOrder.OrderProductI[]) =>
    aProducts.map(product => product.count * product.price)
        .reduce(SFunc.fSum); // массив цены за товар
