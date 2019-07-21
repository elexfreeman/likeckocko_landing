declare var apiUrl: string;
import axios, { AxiosStatic } from 'axios';

/**
 * Базовый объект
 */
export default class BaseObject {

    /* Основные библиотеки */
    protected axios: AxiosStatic;
    protected apiUrl: string;

    /* ошибки выьолнения */
    protected errors: { [key: string]: string };
    protected ok: boolean;

    constructor() {
        this.axios = axios;
        this.apiUrl = apiUrl;
        this.ok = true;
    }

    /**
     * Список ошибок
     */
    public getErrors(): { [key: string]: string } {
        return this.errors;
    }

    /**
     * Добавить ошибку
     * @param key 
     * @param val 
     */
    public addError(key: string, val: string){
        this.errors[key] = val;
        this.ok = false;
    }

    /**
     * Есть ли ошибки
     */
    public isOk(): boolean {
        return this.ok;
    }


}
