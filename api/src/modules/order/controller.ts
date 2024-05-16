import { Request, Response, NextFunction } from 'express'
import service from './service'
import { OrderSetStatusRequest } from './dto/orderSetStatus.request'
import { PayloadDto } from '../auth/dto/payload.dto'

class Controller {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            var data = await service.findAllForAdmin()
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async setStatus(req: Request, res: Response, next: NextFunction) {
        try {
            var data = await service.setStatus(req.body as OrderSetStatusRequest, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
}

export default new Controller();