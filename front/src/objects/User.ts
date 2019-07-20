declare var localStorage;
import { Card } from "./Card";
import BaseObject from "./BaseObject";

export class User extends BaseObject {

    public token: string;
    public name: string;
    public phone: string;

    constructor() {
        super();      
        this.token = localStorage.getItem('token');
    }

}