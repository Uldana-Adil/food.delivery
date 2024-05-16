import { HOST } from "./axios-init"

class PromotionService {
    baseURL: string
    constructor() {
        this.baseURL = '/api/promotion'
    }
    async findAll() {
        const response = await HOST.post(`${this.baseURL}/get`, {})
        return response
    }

    async findOne(id: number) {
        const response = await HOST.get(`${this.baseURL}/` + id)
        return response
    }

    async create(fd: any) {
        const response = await HOST.post(`${this.baseURL}/create`, fd)
        return response
    }

    async update(fd: any) {
        const response = await HOST.put(`${this.baseURL}`, fd)
        return response
    }

    async delete(id: number) {
        const response = await HOST.delete(`${this.baseURL}/` + id)
        return response
    }

    async appendProductType(id: number, productTypeId: number) {
        const response = await HOST.post(`${this.baseURL}/appendProductType`, {
            id,
            productTypeId
        })
        return response
    }

    async removeProductType(id: number, productTypeId: number) {
        const response = await HOST.post(`${this.baseURL}/removeProductType`, {
            id,
            productTypeId
        })
        return response
    }
    async appendProduct(id: number, productId: number) {
        const response = await HOST.post(`${this.baseURL}/appendProduct`, {
            id,
            productId
        })
        return response
    }

    async removeProduct(id: number, productId: number) {
        const response = await HOST.post(`${this.baseURL}/removeProduct`, {
            id,
            productId
        })
        return response
    }

}

const promotionService = new PromotionService()

export default promotionService