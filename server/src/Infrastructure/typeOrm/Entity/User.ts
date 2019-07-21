import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200, nullable: true })
    name: string;

    @Column({ type: "varchar", length: 400, nullable: true })
    phone: string;

    @Column({ type: "varchar", length: 400, nullable: true })
    token: string;

    @OneToMany(type => Order, order => order.user)
    orders: Order[];


}