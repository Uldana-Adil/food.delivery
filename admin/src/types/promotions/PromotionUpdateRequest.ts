import { IPromotion } from "./IPromotion"

export class PromotionUpdateRequest {
    id:number
    name:string
    description:string
    discount:number
    
    constructor(promotion:IPromotion) {
        this.id=promotion.id
        this.name=promotion.name
        this.description=promotion.description
        this.discount=promotion.discount
    }
}