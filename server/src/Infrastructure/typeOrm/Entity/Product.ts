import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import UrlGetCyrillic from '../../../Lib/UrlGetCyrillic';
import { OrderProduct } from './OrderProduct';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200, nullable: true })
    caption: string;

    @Column({ type: "varchar", length: 400, nullable: true })
    description: string;

    @Column({ type: "varchar", length: 400, nullable: true })
    img: string;

    @Column({ type: "varchar", length: 400, nullable: true })
    url: string;

    @Column({ type: 'decimal', default: 0, precision: 10, scale: 2 })
    price: number;

    @Index()
    @Column({ type: 'tinyint', default: 1 })
    isPublished: boolean;

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.product)
    orderProduct: OrderProduct;

    /**
     * парсинг подложки картинки
     */
    public bgImg(): string {
        let res = '';

        if (this.img) {
            let tmp = this.img.split('.');
            res = tmp[0] + '_b.' + tmp[1];
        }

        return res;
    }

    /**
     * URL товара
     */
    public getUrl(): string {
        let res = '';
        if (this.caption && this.id) {
            res = this.id + '-' + UrlGetCyrillic.translit(this.caption);
        }
        return res;
    }
}