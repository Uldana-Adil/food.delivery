import express from 'express'
import authRouter from './modules/auth/router'
import porductTypeRouter from './modules/productType/router'
import productRouter from './modules/product/router'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/productType',porductTypeRouter)
router.use('/product',productRouter)

export default router