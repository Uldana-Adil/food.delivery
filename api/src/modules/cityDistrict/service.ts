import { Repository } from "typeorm"
import { City } from "../../entities/city.entity"
import { AppDataSource } from "../../data-source"
import { ErrorResponse } from "../../middlewares/types/errorResponse"
import { CityDistrict } from "../../entities/cityDistrict.entity"
import { CityDistrictCreateDto } from "./dto/cityDistrictCreate.dto"
import { CityDistrictUpdateDto } from "./dto/cityDistrictUpdate.dto"

class Service {
    repository:Repository<CityDistrict>
    cityRepository:Repository<City>
    constructor(){
        this.repository = AppDataSource.getRepository(CityDistrict)
        this.cityRepository = AppDataSource.getRepository(City)
    }
    async findAll():Promise<CityDistrict[]> {
        return this.repository.find({relations:['districts'], where:{deleted:false}})
    }

    async findOne(id:number):Promise<CityDistrict | null> {
        return this.repository.findOne({relations:['districts'], where:{id,deleted:false}})
    }

    async create(dto:CityDistrictCreateDto):Promise<CityDistrict> {
        const cityDistrict = new CityDistrict()
        cityDistrict.name = dto.name
        const city = await this.cityRepository.findOneBy({id:dto.cityId})
        if(!city) {
            throw ErrorResponse.notFound("CITY_NOT_FOUND")
        }
        cityDistrict.city = city
        return this.repository.save(cityDistrict)
    }

    async update(dto:CityDistrictUpdateDto):Promise<CityDistrict> {
        const cityDistrict = await this.repository.findOneBy({id:dto.id})
        if(!cityDistrict) {
            throw ErrorResponse.notFound("CITY_NOT_FOUND")
        }
        cityDistrict.name = dto.name
        return this.repository.save(cityDistrict)
    }

    async delete(id:number):Promise<void> {
        const cityDistrict = await this.repository.findOneBy({id})
        if(!cityDistrict) {
            throw ErrorResponse.notFound("CITY_NOT_FOUND")
        }
        cityDistrict.deleted = true
        await this.repository.save(cityDistrict)
    }
}

export default new Service()