import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { OrderProduct } from './OrderProduct';

@Entity()
export class Order {

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

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createAt: string;

    @ManyToOne(type => User, user => user.orders)
    user: User;

   /*  @OneToMany(type => OrderProduct, order_product => order_product.order)
    order_product: OrderProduct[]; */

}