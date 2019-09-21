import { AAClasses } from '@a-a-game-studio/aa-core/lib'
import { Product } from '../Product';

export class InfoA extends AAClasses.BaseModule.BaseActions {

    public object: Product;

    /**
   * Список товаров
   */
    public async faGetList(): Promise<Product[]> {
        let res: Product[];
        let data = await this.object.listDB.productDB.faGetList();

        for (let i = 0; i < data.length; i++) {
            res.push(Product.Init(this.object.errorSys, data[i], this.object.listDB));
        }

        return res;
    }

}