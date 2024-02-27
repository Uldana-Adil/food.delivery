import { Repository } from "typeorm"
import { LoginDto } from "./dto/login.dto"
import userService from "../user/service"
import bcrypt from 'bcrypt'
import { ErrorResponse } from "../../middlewares/types/errorResponse"
import { RegisterDto } from "./dto/register.dto"
import { UserCreateDto } from "../user/dto/userCreate.dto"
import { PayloadDto } from "./dto/payload.dto"
import jwt from 'jsonwebtoken'
class Service {
    async login(dto:LoginDto):Promise<[PayloadDto, string]> {
        const user = await userService.findByEmailOrPhone(dto.query)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
        if(!bcrypt.compareSync(dto.password, user.passwordHash)) {
            throw ErrorResponse.unauthorized("INCORRECT_PASSWORD")
        }
        const payload:PayloadDto = {
            id:user.id,
            email:user.email,
            phone:user.phone
        }
        return [payload, this.generateToken(payload)]
    }
    async register(dto:RegisterDto):Promise<[PayloadDto, string]> {
        let existUser = await userService.findByEmailOrPhone(dto.email)
        if(existUser) {
            throw ErrorResponse.badRequest("USER_ALREADY_EXISTS")
        }
        existUser = await userService.findByEmailOrPhone(dto.phone)
        if(existUser) {
            throw ErrorResponse.badRequest("USER_ALREADY_EXISTS")
        }
        const userCreateDto:UserCreateDto = {
            phone:dto.phone,
            email:dto.email,
            name:dto.name,
            lastName:dto.lastName,
            password:dto.password
        }
        const user = await userService.create(userCreateDto)
        const payload:PayloadDto = {
            id:user.id,
            email:user.email,
            phone:user.phone
        }
        return [payload, this.generateToken(payload)]
    }

    async resetPassword(email:string):Promise<void> {
        const user = await userService.findByEmailOrPhone(email)
        if(!user) {
            throw ErrorResponse.notFound("USER_NOT_FOUND")
        }
    }

    private generateToken(payload:PayloadDto) {
        return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '24d' })
    }
}

export default new Service()