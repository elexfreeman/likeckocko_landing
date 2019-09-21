import { AAClasses } from '@a-a-game-studio/aa-core/lib'
import { ProductActions } from './Actions/ProductActions';
import { ProductI } from './ProductDB/ProductE';
import UrlGetCyrillic from '../../Lib/UrlGetCyrillic';
import { ChockoListDB } from '../ChockoListDB';

/**
 * Товар
 */
export class Product extends AAClasses.BaseModule.AABase {

    public data: ProductI;
    public listDB: ChockoListDB;

    public actions: ProductActions; // события товара

    constructor(errorSys: AAClasses.Components.ErrorSys, listDB: ChockoListDB) {
        super(errorSys, listDB);

        this.actions = new ProductActions(this);
        this.clearData();
    }

    public clearData() {

    }

    /**
     * парсинг подложки картинки
     */
    public bgImg(): string {
        let res = '';

        if (this.data.img) {
            let tmp = this.data.img.split('.');
            res = tmp[0] + '_b.' + tmp[1];
        }

        return res;
    }

    /**
     * URL товара
     */
    public getUrl(): string {
        let res = '';
        if (this.data.caption && this.data.id) {
            res = this.data.id + '-' + UrlGetCyrillic.translit(this.data.caption);
        }
        return res;
    }

    /**
     * Переводит ProductI в Product
     * @param errorSys 
     * @param data 
     * @param userDB 
     */
    public static Init(errorSys: AAClasses.Components.ErrorSys, data: ProductI, listDB: ChockoListDB): User {
        /* создаем Product */
        let object = new Product(errorSys, listDB);
        /* копируем в него поля из базы */
        object.data = data;
        return object;
    }

}