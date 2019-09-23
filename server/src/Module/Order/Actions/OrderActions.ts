import { AAClasses } from '@a-a-game-studio/aa-core/lib'
import { InfoA } from './InfoA';
import { CreateA } from './CreateA';
export class OrderActions extends AAClasses.BaseModule.BaseActions {
    public infoA: InfoA;
    public сreateA: CreateA;

    constructor(object: AAClasses.BaseModule.AABase) {
        super(object)
        this.infoA = new InfoA(this.object);
        this.сreateA = new CreateA(this.object);
    }
}