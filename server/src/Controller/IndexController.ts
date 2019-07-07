import * as express from 'express';
import { ProductSQL } from '../Infrastructure/SQL/Repository/ProductSQL';
import MainRequest from '../System/MainRequest';
const router = express.Router();

/**
 * Контроллер 
 */
class IndexController {

    req: any;
    res: any;

    constructor(req: MainRequest, res: any) {
        console.log('IndexController');
        this.req = req;
        this.res = res;
    }

    /**
     * парсинг подложки картинки
     * @param img 
     */
    private parseBgImg(img: string): string {
        let res = '';

        let tmp = img.split('.');  
        res = tmp[0]+'_b.' + tmp[1];


        return res;
    }

    /**
     * index page
     */
    public async Index() {
        console.log('index page');
        const productSQL = new ProductSQL();
        let data: any;
        data = await productSQL.list(0, 1000, {});

        /* картинки на фоне */
        for (let i = 0; i < data.length; i++) {
            data[i]['img_b'] = this.parseBgImg(data[i].img);
        }

        this.res.render('index', { page: "Главная", products: data });
    }

}

/**
 * Индексная страница
 */
router.get('/', (req: any, res: any, next) => {
    const self = new IndexController(req, res);
    self.Index();
});


export { router };
