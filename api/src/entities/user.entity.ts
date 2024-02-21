import { BaseEntity } from "./base.entity";
import { Column, Entity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    @Column()
    phone!:string

    @Column()
    email!:string

    @Column()
    name!:string

    @Column()
    lastName!:string

    @Column()
    passwordHash!:string
}