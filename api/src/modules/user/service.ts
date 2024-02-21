import { Repository } from "typeorm"
import { User } from "../../entities/user.entity"
import { AppDataSource } from "../../data-source"
import { UserCreateDto } from "./dto/userCreate.dto"
import bcrypt from 'bcrypt'

class Service {
    repository: Repository<User>
    constructor(){
        this.repository = AppDataSource.getRepository(User)
    }

    async findByEmailOrPhone(query:string):Promise<User | null> {
        let user = await this.repository.findOneBy({email:query})
        if(!user) {
            return this.repository.findOneBy({phone:query})
        }
        return user
    }

    async create(dto:UserCreateDto):Promise<User> {
        const user = new User()
        user.email = dto.email
        user.phone = dto.phone
        user.name = dto.name
        user.lastName = dto.lastName
        user.passwordHash = await bcrypt.hash(dto.password,5)
        return this.repository.save(user)
    }
}


export default new Service()