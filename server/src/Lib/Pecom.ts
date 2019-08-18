import axios from "axios";
const FormData = require('form-data');
/**
 * Для транспортной компании ПЭК
 */

export interface TownI {
    id: number;
    caption: string;
    region: string;
}

export interface CargoI {
    width: number; // Ширина
    length: number; // Длина
    height: number; // Высота
    volume: number; // Объем
    weight: number; // Вес
    oversizedCargo: boolean; // Признак негабаритности груза
    storage: boolean; // Признак ЗУ
}

export interface TakeI {
    town: number; // ID города забора 
    tent: boolean; // требуется растентровка при заборе 
    gidro: boolean; // требуется гидролифт при заборе 
    manip: boolean; // требуется манипулятор при заборе 
    speed: boolean; // Срочный забор (только для Москвы) 
    moscow: number; // Без въезда, МОЖД, ТТК, Садовое. значения соответственно: 0, 1, 2, 3 
    region: boolean; // Между регионами
}

export interface DeliverI {
    town: number; // ID города доставки
    tent: boolean; //Требуется растентровка при доставке
    gidro: boolean; // Требуется гидролифт при доставке
    manip: boolean; // Требуется манипулятор при доставке
    speed: boolean; // Срочная доставка (только для Москвы) 
    moscow: number; // Без въезда, МОЖД, ТТК, Садовое. значения соответственно: 0,1,2,3 
    region: boolean; // Между регионами
}

export interface CalcI {
    places: CargoI[];
    take: TakeI;
    deliver: DeliverI;
    plombir: number; // Количество пломб 
    strah: number; // Величина страховки 
    ashan: boolean; // Доставка в Ашан 
    night: boolean; // Забор в ночное время 
    pal: number; // Требуется запаллечивание груза (0 - не требуется, значение больше нуля - количество паллет)
    pallets: number; // Кол-во паллет для расчет услуги паллетной перевозки (только там, где эта услуга предоставляется)
    need_take: boolean; // нужно забрать
    need_deliv: boolean; // нужно доставить до адреса
}


export class Pecom {

    public towns: TownI[];
    public regions: string[];

    constructor() {
        this.towns = [];
        this.regions = [];
    }

    /**
     * Асинхронный конструктор
     */
    static async Init(): Promise<Pecom> {
        let resp = new Pecom();
        resp.towns = await resp.loadTowns();
        return resp
    }

    /**
     * Список городов доставки
     */
    public async loadTowns(): Promise<TownI[]> {

        let towns = await axios.get('https://pecom.ru/ru/calc/towns.php');
        for (let region in towns.data) {
            this.regions.push(region)
            for (let key2 in towns.data[region]) {
                this.towns.push({
                    id: parseInt(key2),
                    caption: towns.data[region][key2],
                    region: region
                });
            }
        }

        return this.towns;
    }

    /**
     * конвертирует JSON to URI
     * @param srcjson 
     * @param parent 
     */
    public xwwwfurlenc(srcjson: any, parent = "") {
        if (typeof srcjson !== "object")
            if (typeof console !== "undefined") {
                console.log("\"srcjson\" is not a JSON object");
                return null;
            }

        let u = encodeURIComponent;
        let urljson = "";
        let keys = Object.keys(srcjson);

        for (let i = 0; i < keys.length; i++) {
            let k = parent ? parent + "[" + keys[i] + "]" : keys[i];

            if (typeof srcjson[keys[i]] !== "object") {
                urljson += u(k) + "=" + u(srcjson[keys[i]]);
            } else {
                urljson += this.xwwwfurlenc(srcjson[keys[i]], k)
            }
            if (i < (keys.length - 1)) urljson += "&";
        }

        return urljson;
    }

    /**
     * Конвертируте в понятный для api
     * @param data 
     */
    private convertCalcData(data: CalcI): any {
        let resp: any = data;

        resp.strah = Number(resp.strah);
        resp.night = Number(resp.night);
        resp.need_take = Number(resp.need_take);; // нужно забрать
        resp.need_deliv = Number(resp.need_take);; // нужно доставить до адреса

        for (let i = 0; i < resp.places.legth; i++) {
            resp.places[i].oversizedCargo = Number(resp.places[i].oversizedCargo);
        }

        resp.deliver.tent = Number(resp.deliver.tent);
        resp.deliver.gidro = Number(resp.deliver.gidro);
        resp.deliver.manip = Number(resp.deliver.manip);
        resp.deliver.speed = Number(resp.deliver.speed);
        resp.deliver.region = Number(resp.deliver.region);

        resp.take.tent = Number(resp.take.tent);
        resp.take.gidro = Number(resp.take.gidro);
        resp.take.manip = Number(resp.take.manip);
        resp.take.speed = Number(resp.take.speed);
        resp.take.region = Number(resp.take.region);

        return resp;
    }

    /**
     * Расчет стоимости перевозки/доставки
     */
    public async calc(data: CalcI) {
        let form = this.xwwwfurlenc(this.convertCalcData(data));

        let resp = await axios.get('https://calc.pecom.ru/bitrix/components/pecom/calc/ajax.php?' + form, {
            headers: { 'content-type': 'multipart/form-data' },
        });
        return resp;
    }
}