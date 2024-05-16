import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity()
export class BonusTransactions extends BaseEntity {
    @Column()
    amount!:number

    @Column()
    type!:string

    @ManyToOne(()=>User, user=>user.bonusTransactions)
    user!:User

    @ManyToOne(()=>Order, order=>order.bonusTransactions)
    order!:Order
}