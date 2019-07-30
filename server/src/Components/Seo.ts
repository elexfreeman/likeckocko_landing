import MainRequest from "../System/MainRequest";

export interface Og {
    type: string;
    site_name: string;
    title: string;
    description: string;
    url: string;
    image: string;
    imageType: string;
}

export class Seo {

    private url: string; // входящий url
    private conf: any; // конфиг
    private req: MainRequest; 

    public title: string;
    public description: string;
    public keywords: string;
    public og: Og;

    constructor(req: MainRequest, conf: any) {
        this.url = req.url;
        this.conf = conf;
        this.req = req;

        this.title = 'Likechoco - Интернет магазин шоколада ручной работы';
        this.description = 'Likechoco - Интернет магазин шоколада ручной работы';
        this.keywords = 'магазин шоколада ручной работы шоколад';

        this.og = {
            type: 'website',
            site_name: 'Likechoco',
            title: this.title,
            description: this.description,
            url: conf['protocol'] + req.headers['host'],
            image: conf['protocol'] + req.headers['host'] + '/img/logo.jpg',
            imageType: 'image/jpeg',
        }
    }

    public reload() {
        this.og = {
            type: 'website',
            site_name: 'Likechoco',
            title: this.title,
            description: this.description,
            url: this.conf['protocol'] + this.req.headers['host'],
            image: this.conf['protocol'] + this.req.headers['host'] + '/img/logo.jpg',
            imageType: 'image/jpeg',
        }
    }

    private main() {
        this.title = 'Likechoco - Интернет магазин шоколада ручной работы'
    }

}