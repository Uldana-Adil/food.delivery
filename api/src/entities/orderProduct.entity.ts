import { Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity()
export class OrderProduct extends BaseEntity {
    @ManyToOne(()=>Order, o=>o.goods)
    order!: Order

    @ManyToOne(()=>Product, p=>p.orderProducts)
    product!: Product
}