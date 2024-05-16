import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ProductType } from "./productType.entity";
import { Product } from "./product.entity";

@Entity()
export class Promotion extends BaseEntity {
    @Column()
    name!: string;

    @Column({
        nullable: true
    })
    startDate?: Date;
    @Column({
        nullable: true
    })
    endDate?: Date;

    @Column()
    description!: string;

    @Column()
    discount!: number

    @ManyToMany(() => ProductType, (productType) => productType.promotions)
    @JoinTable()
    productTypes!: ProductType[]

    @ManyToMany(() => Product, (product) => product.promotions)
    @JoinTable()
    products!: Product[]

}