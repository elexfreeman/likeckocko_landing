import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

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

    @ManyToOne(type => User, user => user.orders)
    user: User;

}