import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, Index } from 'typeorm';
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

    @Column({ type: 'decimal', default: 0, precision: 10, scale: 2 })
    price: number;

    
    @OneToOne(type => Product)    
    @JoinColumn()   
    product: Product;


    @OneToOne(type => Order)    
    @JoinColumn()   
    order: Order;

}