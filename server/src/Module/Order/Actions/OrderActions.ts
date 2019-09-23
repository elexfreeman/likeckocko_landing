import { AAClasses } from '@a-a-game-studio/aa-core/lib'
import { InfoA } from './InfoA';
export class OrderActions extends AAClasses.BaseModule.BaseActions {
    public infoA: InfoA;

    constructor(object: AAClasses.BaseModule.AABase) {
        super(object)
        this.infoA = new InfoA(this.object);
    }
}