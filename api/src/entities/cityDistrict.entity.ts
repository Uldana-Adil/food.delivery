import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { City } from "./city.entity";

@Entity()
export class CityDistrict extends BaseEntity {
    @Column()
    name!: string

    @ManyToOne(()=>City, (city)=>city.districts)
    city!: City
}