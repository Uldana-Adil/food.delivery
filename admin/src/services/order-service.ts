import { HOST } from "./axios-init"

class OrderService {
    baseURL:string
    constructor() {
        this.baseURL = '/api/order'
    }
    async findAll() {
        const response = await HOST.get(`${this.baseURL}`)
        return response
    }

    async setStatus(id:number, statusCode:string) {
        const response = await HOST.post(`${this.baseURL}/setStatus`, {id,statusCode})
        return response
    }
}

const orderService = new OrderService()
export default orderService