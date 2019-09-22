import { AAClasses } from '@a-a-game-studio/aa-core/lib'
import { Product } from '../Product';
import { FieldValidator } from '@a-a-game-studio/aa-components/lib';
import { ProductI } from '../ProductDB/ProductE';

/**
 * Информация о товаре
 */
export class InfoA extends AAClasses.BaseModule.BaseActions {

    public object: Product;

    /**
     * Информация о продукте по id
     * @param iProductId 
     */
    public async faGetInfo(iProductId: number): Promise<void> {
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let fV = new FieldValidator(this.object.errorSys, iProductId)
            .fSetErrorString(errorString)
            .fExist()
            .fInt()
            .fMore(0);

        this.object = await fV.faDoIfOkAsync(async () =>
            Product.Init(
                this.object.errorSys,
                await this.object.listDB.productDB.faGetInfo(iProductId)
                , this.object.listDB
            )
        );
    }
    /**
     * Информация о продукте по Url
     * @param sUrl 
     */
    public async faGetInfoByUrl(sUrl: string): Promise<void> {
        const errorString = this.fClassName() + '.' + this.fMethodName();

        let fV = new FieldValidator(this.object.errorSys, sUrl)
            .fSetErrorString(errorString)
            .fExist()
            .fText()
            .fMinLen(1)

        this.object = await fV.faDoIfOkAsync(async () =>
            Product.Init(
                this.object.errorSys,
                await this.object.listDB.productDB.faGetInfoByUrl(sUrl)
                , this.object.listDB
            )
        );
    }

    /**
   * Список товаров
   */
    public async faGetList(): Promise<Product[]> {

        let resp: Product[] = []
        let data = await this.object.listDB.productDB.faGetList();
        for(let i=0; i< data.length; i++ ){
            resp.push(Product.Init(
                this.object.errorSys,
                data[i]
                , this.object.listDB
            ))
        }
        return resp;
    }

}