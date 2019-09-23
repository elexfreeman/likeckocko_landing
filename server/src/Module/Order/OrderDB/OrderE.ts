import { ProductE } from '../../Product/ProductDB/ProductE';
import { Validator } from '@a-a-game-studio/aa-components/lib';

export interface OrderProductI {
    id?: number;
    count?: number;
    order_id?: number;
    price?: number;
    product_id?: number;
    product?: ProductE;
}

export interface OrderI {
    id?: number;
    user_id?: number;
    city?: string;
    delivery_address?: string;
    comment?: string;
    delivery_date?: string;
    delivery_time_comment?: string;
    create_at?: string;
    products?: OrderProductI[];
}

export class OrderE {
    //Имя таблицы
    public static NAME = 'orders';


    /**
     * Получить правила валидации на вставку
     */
    public getRulesInsert() {
        return this.getRules('insert');
    }

    /**
     * Получить правила валидации на обновление
     */
    public getRulesUpdate() {
        return this.getRules('update');
    }

    /**
     * Описание правил валидации
     * @param typeRules
     */
    private getRules(typeRules: string) {
        let rules = new Validator();

        /* **************************************** */
        /* ************** insert ****************** */
        if (typeRules == 'insert') {

            rules.set(rules.rule('user_id')
                .typeInt()
                .require()
                .error(OrderE.NAME + ' - user_id')
            );

            rules.set(rules.rule('city')
                .typeText()
                .error(OrderE.NAME + ' - city')
            );

            rules.set(rules.rule('comment')
                .typeText()
                .error(OrderE.NAME + ' - comment')
            );

            rules.set(rules.rule('delivery_address')
                .typeText()
                .error(OrderE.NAME + ' - delivery_address')
            );

            rules.set(rules.rule('delivery_time_comment')
                .typeText()
                .error(OrderE.NAME + ' - delivery_time_comment')
            );

        }

        /* ****************************************** */
        /* **************** update ****************** */
        if (typeRules == 'update') {

            rules.set(rules.rule('city')
                .typeText()
                .error(OrderE.NAME + ' - city')
            );

            rules.set(rules.rule('comment')
                .typeText()
                .error(OrderE.NAME + ' - comment')
            );

            rules.set(rules.rule('delivery_address')
                .typeText()
                .error(OrderE.NAME + ' - delivery_address')
            );

            rules.set(rules.rule('delivery_time_comment')
                .typeText()
                .error(OrderE.NAME + ' - delivery_time_comment')
            );
        }

        return rules.get();
    }

}

