import { NextFunction, Request, Response } from "express";
import service from "./service";

class Controller {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const [payload, token] = await service.login(req.body)
            res.cookie('token', token, { httpOnly: true })
            return res.json(payload)
        }
        catch (err) {
            next(err)
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const [payload, token] = await service.register(req.body)
            res.cookie('token', token, { httpOnly: true })
            return res.json(payload)
        }
        catch (err) {
            next(err)
        }
    }
}

export default new Controller()