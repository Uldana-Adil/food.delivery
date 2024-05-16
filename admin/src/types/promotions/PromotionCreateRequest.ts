export class PromotionCreateRequest {

    name: string;
    description: string;
    discount: number;
    constructor() {
        this.name = ''
        this.description = ''
        this.discount = 0
    }
}