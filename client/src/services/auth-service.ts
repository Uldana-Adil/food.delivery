import { AxiosError } from "axios"
import ActivateRequest from "../types/auth/ActivateRequest"
import LoginRequest from "../types/auth/LoginRequest"
import RegisterRequest from "../types/auth/RegisterRequest"
import ResetPasswordRequest from "../types/auth/ResetPasswordRequest"
import { HOST } from "./axios-init"

class AuthService {
    baseURL: string
    constructor() {
        this.baseURL = '/api/auth'
    }

    async login(formData: LoginRequest) {
        const response = await HOST.post(`${this.baseURL}/login`, formData)
        return response
    }

    async logout() {
        const response = await HOST.post(`${this.baseURL}/logout`)
        return response
    }

    async refresh() {
        try {
            const response = await HOST.get(`${this.baseURL}/refresh`)
            return response
        } catch (e: any) {
            console.log(e)
            return e.response

        }
    }

    async register(formData: RegisterRequest) {
        const response = await HOST.post(`${this.baseURL}/register`, formData)
        return response
    }

    async resetPassword(email: string) {
        const response = await HOST.post(`${this.baseURL}/resetPassword`, { email })
        return response
    }

    async resetPasswordPost(formData: ResetPasswordRequest) {
        const response = await HOST.post(`${this.baseURL}/resetPasswordPost`, formData)
        return response
    }

    async activate(formData: ActivateRequest) {
        const response = await HOST.post(`${this.baseURL}/activate`, formData)
        return response
    }
}

const authService = new AuthService()
export default authService