import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class UserPaymentCard extends BaseEntity {
    @Column()
    name!:string
    @Column()
    cardNumber!: string;
    @Column()
    expirationDate!:string;

    @Column({nullable:true})
    token?:string
    

    @ManyToOne(()=>User, user=>user.userPaymentCards)
    user!:User
}