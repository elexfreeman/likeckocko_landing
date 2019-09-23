import { AAClasses } from '@a-a-game-studio/aa-core/lib'
import { OrderActions } from './Actions/OrderActions';
import { OrderI } from './OrderDB/OrderE';
import { ChockoListDB } from '../ChockoListDB';

/**
 * Товар
 */
export class Order extends AAClasses.BaseModule.AABase {

    public data: OrderI;
    public listDB: ChockoListDB;

    public actions: OrderActions; // события заказа

    constructor(errorSys: AAClasses.Components.ErrorSys, listDB: ChockoListDB) {
        super(errorSys, listDB);

        this.actions = new OrderActions(this);
        this.clearData();
    }

    public clearData() {

    }

    /**
     * Переводит OrderI в Order
     * @param errorSys 
     * @param data 
     * @param userDB 
     */
    public static Init(errorSys: AAClasses.Components.ErrorSys, data: OrderI, listDB: ChockoListDB): Order {
        /* создаем Order */
        let object = new Order(errorSys, listDB);
        /* копируем в него поля из базы */
        object.data = data;
        return object;
    }

}