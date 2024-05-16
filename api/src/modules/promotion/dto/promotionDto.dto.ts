import { Promotion } from "../../../entities/promotion.entity"

export class PromotionDto {
    name:string
    description:string
    discount:number
    constructor(data:Promotion) {
        this.name = data.name
        this.description = data.description
        this.discount = data.discount
    }
}