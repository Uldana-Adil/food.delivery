import { Request, Response, NextFunction } from 'express'
import service from './service'
import { PromotionFilter } from './dto/pormotionFilter.dto';
import { PayloadDto } from '../auth/dto/payload.dto';

class Controller {
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.findAll(req.body as PromotionFilter, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.findOne(+req.params.id, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.create(req.body, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.update(req.body, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await service.delete(+req.params.id, req.user as PayloadDto)
            res.status(204).send()
        } catch (err) {
            next(err)
        }
    }

    async appendProductType(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.appendProductType(+req.body.id, +req.body.productTypeId, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
    async removeProductType(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.removeProductType(+req.body.id, +req.body.productTypeId, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }

    async appendProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.appendProduct(+req.body.id, +req.body.productId, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
    async removeProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await service.removeProduct(+req.body.id, +req.body.productId, req.user as PayloadDto)
            return res.json(data)
        } catch (err) {
            next(err)
        }
    }
}

export default new Controller();