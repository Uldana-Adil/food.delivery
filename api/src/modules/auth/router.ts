import express from 'express'
import controller from './controller'
const router = express.Router()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/resetPassword', controller.resetPassword)

export default router