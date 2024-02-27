import { Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OrderProduct } from "./orderProduct.entity";
import { UserAddress } from "./userAddress.entity";

@Entity()
export class Order extends BaseEntity {
    @OneToMany(()=>OrderProduct, og=>og.order)
    goods!: OrderProduct[]

    @OneToMany(()=>UserAddress, ua=>ua.order)
    userAddresses!: UserAddress[]
}