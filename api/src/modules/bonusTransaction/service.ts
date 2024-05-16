import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source';
import { BonusTransactions } from '../../entities/bonusTransactions.entity';
import { SetTransactionDto } from './dto/SetTransaction.dto';
import { PayloadDto } from '../auth/dto/payload.dto';
import userService from '../user/service'
import { ErrorResponse } from '../../middlewares/types/errorResponse';
import orderService from '../order/service';

class Service {

    repository:Repository<BonusTransactions>

    constructor() {
        this.repository = AppDataSource.getRepository(BonusTransactions);

    }

    async setTransaction(dto:SetTransactionDto, payload:PayloadDto) {
        const user = await userService.findByEmail(payload.email)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        const order = await orderService.findOne(dto.orderId, payload)
        if(!order) {
            throw ErrorResponse.notFound("ORDER_NOT_FOUND")
        }
        const item = new BonusTransactions()
        item.amount = dto.amount
        item.order = order
        item.user = user
        item.type = dto.type
        await this.repository.save(item);
    }

    async getTransactions(payload:PayloadDto) {
        const user = await userService.findByEmail(payload.email)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        const transactions = await this.repository.find({
            where: {
                user: {
                    id: user.id
                },
                deleted:false
            }
        })
        return transactions
    }

    async findTransactionsByOrderId(orderId:number, type:string) {
        const list = await this.repository.find({
            where: {
                order: {
                    id: orderId
                },
                type,
                deleted:false
            }
        })
        return list
    }

    async cancelTransaction(orderId:number) {
        const item = await this.repository.findOne({
            where: {
                order: {
                    id: orderId
                },
                deleted:false,
                type:'remove'
            }
        })
        if(!item) {
            throw ErrorResponse.notFound("TRANSACTION_NOT_FOUND")
        }
        item.deleted = true
        await this.repository.save(item)
    }

}

export default new Service();