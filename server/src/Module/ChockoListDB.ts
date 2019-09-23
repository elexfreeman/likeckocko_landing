import { AAClasses } from '@a-a-game-studio/aa-core/lib'
import { ProductDB } from './Product/ProductDB/ProductDB';
import { OrderDB } from './Order/OrderDB/OrderDB';

/**
 * Интерфейс списка DB переопределенный
 */
export interface ChockoListDBI extends AAClasses.BaseModule.ListDBI {
    productDB: ProductDB;
    orderDB: OrderDB;
}

/**
 * Список полдк к DB переопределенный
 */
export class ChockoListDB extends AAClasses.BaseModule.ListDB {
    public productDB: ProductDB;
    public orderDB: OrderDB;

    constructor(data: ChockoListDBI) {
        super(data);
        this.productDB = data.productDB;
        this.orderDB = data.orderDB;
    }
}