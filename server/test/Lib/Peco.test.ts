// process.env.TS_NODE_PROJECT: './tsconfig.json';

// process.env.TS_CONFIG_PATHS: 'true';
declare var global: any;
import * as mocha from 'mocha';
import { assert } from 'chai';
import { Pecom, CalcI, CargoI, DeliverI, TakeI, TownI } from "../../src/Lib/Pecom";
/**


/* *********************************************** */
/* *********************************************** */
/* *********************************************** */


/* запускатор теста для async-await */
async function run() {

    mocha.it('Список городов доставки', async () => {

        let pecom: Pecom = await Pecom.Init();
        assert.ok(pecom.towns.length > 0);
    }); //it ****

    mocha.it('Найти город Самара', async () => {

        let pecom: Pecom = await Pecom.Init();
        let samara = pecom.towns.filter((item: TownI) => {

            return (
                (item.region.match(/Самара/i) ? (item) : (false))
                ||
                (item.caption.match(/Самара/i) ? (item) : (false))
            )
        });

        console.log(samara);

        assert.ok(samara.length > 0);
    }); //it ****

    mocha.it('Расчет стоимости доставки', async () => {

        let pecom: Pecom = await Pecom.Init();

        let cargo: CargoI;
        let deliver: DeliverI;
        let take: TakeI;
        let data: CalcI;

        cargo = {
            width: 1,
            length: 1,
            height: 1,
            volume: 0.01,
            weight: 1,
            oversizedCargo: false,
            storage: false
        };

        take = {
            town: -481, // ID города забора 
            tent: false, // требуется растентровка при заборе 
            gidro: false, // требуется гидролифт при заборе 
            manip: false, // требуется манипулятор при заборе 
            speed: false, // Срочный забор (только для Москвы) 
            moscow: 0, // Без въезда, МОЖД, ТТК, Садовое. значения соответственно: 0, 1, 2, 3 
            region: false,
        };


        deliver = {
            town: -481, // ID города доставки
            tent: false, //Требуется растентровка при доставке
            gidro: false, // Требуется гидролифт при доставке
            manip: false, // Требуется манипулятор при доставке
            speed: false, // Срочная доставка (только для Москвы) 
            moscow: 0, // Без въезда, МОЖД, ТТК, Садовое. значения соответственно: 0,1,2,3 
            region: false,
        };

       


        data = {
            places: [cargo],
            take: take,
            deliver: deliver,
            plombir: 1, // Количество пломб 
            strah: 0, // Величина страховки 
            ashan: false, // Доставка в Ашан 
            night: false, // Забор в ночное время 
            pal: 0, // Требуется запаллечивание груза (0 - не требуется, значение больше нуля - количество паллет)
            pallets: 0, // Кол-во паллет для расчет услуги паллетной перевозки (только там, где эта услуга предоставляется)
            need_take: false, // нужно забрать
            need_deliv: false, // нужно доставить до адреса
        };



        let resp = await pecom.calc(data);

        console.log(resp.data)

        assert.ok(true);
    }) //it ****


}

run();