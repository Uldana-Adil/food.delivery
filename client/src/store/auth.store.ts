import { makeAutoObservable } from 'mobx'
import { IUser } from '../types/auth/IUser'
import authService from '../services/auth-service'
class AuthStore {
    isAuth: boolean = false
    user?: IUser
    currentBonus: number = 0
    constructor() {
        makeAutoObservable(this)
    }

    setAuth = (value: boolean) => {
        this.isAuth = value
    }

    setUser(user: IUser) {
        this.user = user
    }

    setBonus(bonus: number) {
        this.currentBonus = bonus
    }

    logout() {
        authService.logout().then(() => {
            this.isAuth = false
            this.user = undefined
        }).catch((error) => {
            console.log(error)
        })
    }
}

export default AuthStore;