import { AAClasses } from '@a-a-game-studio/aa-core/lib'
import { ProductDB } from './Product/ProductDB/ProductDB';

/**
 * Интерфейс списка DB переопределенный
 */
export interface ChockoListDBI extends AAClasses.BaseModule.ListDBI {
    productDB: ProductDB;
}

/**
 * Список полдк к DB переопределенный
 */
export class ChockoListDB extends AAClasses.BaseModule.ListDB {
    public productDB: ProductDB;

    constructor(data: ChockoListDBI) {
        super(data);
        this.productDB = data.productDB;
    }
}