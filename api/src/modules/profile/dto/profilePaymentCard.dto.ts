import { UserPaymentCard } from "../../../entities/userPaymentCard.entity"

export class ProfilePaymentCardDto {
    id!:number
    name!: string
    cardNumber!: string
    expirationDate!: string
    constructor(data:UserPaymentCard) {
        this.id = data.id
        this.name = data.name
        this.cardNumber = data.cardNumber
        this.expirationDate = data.expirationDate
    }
}