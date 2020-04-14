/**
 * Базовый контролер для фронта
 * запизивается в метод компонента ctrl
 */
export class FBaseController {

    protected store: any;

    constructor(store: any) {
        this.store = store;
    }

}