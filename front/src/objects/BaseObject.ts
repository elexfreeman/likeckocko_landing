declare var apiUrl: string; 
import axios, { AxiosStatic } from 'axios';

/**
 * Базовый объект
 */
export default class BaseObject {

    /* Основные библиотеки */
    protected axios: AxiosStatic;
    protected apiUrl: string;

    constructor() {
        this.axios = axios;        
        this.apiUrl = apiUrl;        
    }
    

}
