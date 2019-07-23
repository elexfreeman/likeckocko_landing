import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class OrderProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200, nullable: true })
    city: string;

    @Column({ type: "varchar", length: 400, nullable: true })
    deliveryAddress: string;

    @Column({ type: "varchar", length: 400, nullable: true })
    comment: string;

    @Column({ type: "varchar", length: 400, nullable: true })
    deliveryDate: string;

    @Column({ type: "varchar", length: 400, nullable: true })
    deliveryTimeComment: string;

    @OneToOne(type => Product)
    @JoinColumn()
    product: Product;


    @ManyToOne(type => Order, order => order.order_product)
    order: Order;

}