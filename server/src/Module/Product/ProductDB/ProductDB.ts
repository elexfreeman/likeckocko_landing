import { AAClasses } from '@a-a-game-studio/aa-core/lib';
import { ProductI } from './ProductE';

export class ProductDB extends AAClasses.BaseModule.BaseDB {

    /**
     * Список товаров
     */
    public async faGetList(): Promise<ProductI[]> {
        let res: ProductI[] = [];
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }


    /**
     * Получить product по его url
     * @param sUrl: number
     */
    public async faGetInfoByUrl(sUrl: string): Promise<ProductI> {
        let res: ProductI;
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }

    /**
     * Получить product по его id
     * @param iProducId: number
     */
    public async faGetInfo(iProducId: number): Promise<ProductI> {
        let res: ProductI;
        this.errorSys.error(this.fClassName() + '.' + this.fMethodName(), 'abstract method');
        return res;
    }
}