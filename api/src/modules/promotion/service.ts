import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source';
import { Promotion } from '../../entities/promotion.entity';
import { PayloadDto } from '../auth/dto/payload.dto';
import { PromotionFilter } from './dto/pormotionFilter.dto';
import { PromotionCreateDto } from './dto/pormotionCreate.dto';
import { PromotionUpdateDto } from './dto/promotionUpdate.dto';
import productService from '../product/service'
import productTypeService from '../productType/service'
import { ErrorResponse } from '../../middlewares/types/errorResponse';

class Service {

    repository: Repository<Promotion>

    constructor() {
        this.repository = AppDataSource.getRepository(Promotion);

    }

    async findAll(filter: PromotionFilter, payload: PayloadDto): Promise<Promotion[]> {
        let list = await this.repository.find({
            relations: ['products', 'products.images', 'productTypes'],
            where: {
                deleted: false,
            },
            order: {
                id:'DESC'
            }
        })
        if (filter.productTypeId) {
            list = list.filter(m => m.productTypes.filter(m => m.id === filter.productTypeId).length > 0)
        }
        if (filter.productId) {
            const product = await productService.findOne(filter.productId)
            list = list.filter(m => m.products.filter(m => m.id === product?.id).length > 0
                || m.productTypes.filter(m => m.id === product?.productType.id).length > 0)
        }
        return list
    }

    async findOne(id: number, payload: PayloadDto): Promise<Promotion | null> {
        return this.repository.findOne({ relations: ['products', 'productTypes'], where: { id, deleted: false } })
    }

    async create(dto: PromotionCreateDto, payload: PayloadDto): Promise<Promotion> {
        const existItem = await this.repository.findOne({
            where: {
                deleted: false,
                name: dto.name,
                discount: dto.discount
            }
        })
        if (existItem) {
            throw ErrorResponse.conflict("PROMOTION_ALREADY_EXISTS")
        }
        const item = new Promotion()
        item.name = dto.name
        item.description = dto.description
        item.discount = dto.discount
        return this.repository.save(item)
    }

    async update(dto: PromotionUpdateDto, payload: PayloadDto): Promise<Promotion> {
        const item = await this.repository.findOne({ relations: ['products', 'productTypes'], where: { id: dto.id, deleted: false } })
        if (!item) {
            throw ErrorResponse.notFound("PROMOTION_NOT_FOUND")
        }
        item.name = dto.name ?? item.name
        item.description = dto.description ?? item.description
        item.discount = dto.discount ?? item.discount
        return this.repository.save(item)
    }

    async delete(id: number, payload: PayloadDto): Promise<void> {
        const item = await this.repository.findOne({ relations: ['products', 'productTypes'], where: { id, deleted: false } })
        if (!item) {
            throw ErrorResponse.notFound("PROMOTION_NOT_FOUND")
        }
        item.deleted = true
        await this.repository.save(item)
    }

    async appendProductType(id: number, productTypeId: number, payload: PayloadDto): Promise<void> {
        const item = await this.repository.findOne({ relations: ['products', 'productTypes'], where: { id, deleted: false } })
        if (!item) {
            throw ErrorResponse.notFound("PROMOTION_NOT_FOUND")
        }
        const productType = await productTypeService.findOne(productTypeId)
        if (!productType) {
            throw ErrorResponse.notFound("PRODUCT_TYPE_NOT_FOUND")
        }
        item.productTypes.push(productType)
        await this.repository.save(item)
    }

    async removeProductType(id: number, productTypeId: number, payload: PayloadDto): Promise<void> {
        const item = await this.repository.findOne({ relations: ['products', 'productTypes'], where: { id, deleted: false } })
        if (!item) {
            throw ErrorResponse.notFound("PROMOTION_NOT_FOUND")
        }
        const productType = await productTypeService.findOne(productTypeId)
        if (!productType) {
            throw ErrorResponse.notFound("PRODUCT_TYPE_NOT_FOUND")
        }
        item.productTypes = item.productTypes.filter(m => m.id !== productType.id)
        await this.repository.save(item)
    }

    async appendProduct(id: number, productId: number, payload: PayloadDto): Promise<void> {
        const item = await this.repository.findOne({ relations: ['products', 'productTypes'], where: { id, deleted: false } })
        if (!item) {
            throw ErrorResponse.notFound("PROMOTION_NOT_FOUND")
        }
        const product = await productService.findOne(productId)
        if (!product) {
            throw ErrorResponse.notFound("PRODUCT_NOT_FOUND")
        }
        item.products.push(product)
        await this.repository.save(item)
    }

    async removeProduct(id: number, productId: number, payload: PayloadDto): Promise<void> {
        const item = await this.repository.findOne({ relations: ['products', 'productTypes'], where: { id, deleted: false } })
        if (!item) {
            throw ErrorResponse.notFound("PROMOTION_NOT_FOUND")
        }
        const product = await productService.findOne(productId)
        if (!product) {
            throw ErrorResponse.notFound("PRODUCT_NOT_FOUND")
        }
        item.products = item.products.filter(m => m.id !== product.id)
        await this.repository.save(item)
    }

}

export default new Service();