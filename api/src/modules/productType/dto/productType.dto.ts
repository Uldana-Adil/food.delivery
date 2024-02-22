import { ProductType } from "../../../entities/productType.entity"

export class ProductTypeDto {
    name!:string
    description!:string
    logo!:string

    constructor(data:ProductType) {
        this.name = data.name
        this.description = data.description
        this.logo = data.logo
    }
}