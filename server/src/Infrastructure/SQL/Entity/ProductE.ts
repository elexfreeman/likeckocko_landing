// Компоненты
import { ModelRulesC } from '../../../Components/ModelRulesC';


export interface ProductI {
    id?: number;
    caption: string;
    description?: string;
    price: number;
}

export class ProductE {
    //Имя таблицы
    public static NAME = 'products';


    /**
     *  Правила создания записей в таблице
     */
    public getRulesInsert() {
        let rules = new ModelRulesC();

        rules.set(rules.rule('caption')
            .type('text')
            .error(ProductE.NAME + '.caption - неверный формат')
        );

        rules.set(rules.rule('description')
            .type('text')
            .error(ProductE.NAME + '.description - неверный формат')
        );

        rules.set(rules.rule('price')
            .type('decimal')
            .error(ProductE.NAME + '.price - неверный формат')
        );


        return rules.get();
    }

    /**
     * Обновление ключевых записей таблицы
     */
    public getRulesUpdate() {
        let rules = new ModelRulesC();

        rules.set(rules.rule('caption')
            .type('text')
            .error(ProductE.NAME + '.caption - неверный формат')
        );

        rules.set(rules.rule('description')
            .type('text')
            .error(ProductE.NAME + '.description - неверный формат')
        );

        rules.set(rules.rule('price')
            .type('decimal')
            .error(ProductE.NAME + '.price - неверный формат')
        );

        return rules.get();
    }

}
