import express from 'express'
import authRouter from './modules/auth/router'
import porductTypeRouter from './modules/productType/router'
import productRouter from './modules/product/router'
import cityRouter from './modules/city/router'
import cityDistrictRouter from './modules/cityDistrict/router'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/productType',porductTypeRouter)
router.use('/product',productRouter)
router.use('/city',cityRouter)
router.use('/cityDistrict',cityDistrictRouter)

export default router