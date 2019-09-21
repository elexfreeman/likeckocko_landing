import { AAClasses } from '@a-a-game-studio/aa-core/lib'
import { ProductDB } from './Product/ProductDB/ProductDB';

export interface ChockoListDBI extends AAClasses.BaseModule.ListDBI {
    productDB: ProductDB;
}

export class ChockoListDB extends AAClasses.BaseModule.ListDB {
    public productDB: ProductDB;

    constructor(data: ChockoListDBI) {
        super(data);
        this.productDB = data.productDB;
    }
}