import { System } from '@a-a-game-studio/aa-core/lib';

export class ChockoSeo extends System.SeoModule.Seo {

    private req: System.MainRequest.MainRequest;

    private conf: any;


    constructor(req: System.MainRequest.MainRequest, conf: any) {
        super();
        this.conf = conf;

        this.sTitle = 'Likechoco - Интернет магазин шоколада ручной работы';
        this.sDescription = 'Likechoco - Интернет магазин шоколада ручной работы';
        this.sKeywords = 'магазин шоколада ручной работы шоколад';

        this.og = {
            type: 'website',
            site_name: 'Likechoco',
            title: this.sTitle,
            description: this.sDescription,
            url: conf['protocol'] + req.headers['host'],
            image: conf['protocol'] + req.headers['host'] + '/img/logo.jpg',
            imageType: 'image/jpeg',
        }
    }

    public reload() {
        this.og = {
            type: 'website',
            site_name: 'Likechoco',
            title: this.sTitle,
            description: this.sDescription,
            url: this.conf['protocol'] + this.req.headers['host'],
            image: this.conf['protocol'] + this.req.headers['host'] + '/img/logo.jpg',
            imageType: 'image/jpeg',
        }
    }   

}