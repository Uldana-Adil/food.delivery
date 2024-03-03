import express from 'express'
import authRouter from './modules/auth/router'
import porductTypeRouter from './modules/productType/router'
import productRouter from './modules/product/router'
import cityRouter from './modules/city/router'
import cityDistrictRouter from './modules/cityDistrict/router'
import profileRouter from './modules/profile/router'
import orderStatusRouter from './modules/orderStatus/router'
import basketRouter from './modules/basket/router'
<<<<<<< HEAD
import catalogRouter from './modules/catalog/router'
=======
>>>>>>> ae759ab05419361e6d9530e429660e6de9027345

import { authMiddleware } from './middlewares/auth.middleware'
import { adminMiddleware } from './middlewares/admin.middleware'

const router = express.Router()

router.use('/auth', authRouter)
<<<<<<< HEAD
router.use('/productType',authMiddleware, adminMiddleware, porductTypeRouter)
router.use('/product', authMiddleware, adminMiddleware, productRouter)
router.use('/city', authMiddleware, adminMiddleware, cityRouter)
router.use('/cityDistrict', authMiddleware, adminMiddleware, cityDistrictRouter)
router.use('/profile', authMiddleware, profileRouter)
router.use('/orderStatus', authMiddleware, adminMiddleware, orderStatusRouter)
router.use('/basket', authMiddleware, basketRouter)
router.use('/catalog', catalogRouter)
=======
router.use('/productType', porductTypeRouter)
router.use('/product', productRouter)
router.use('/city', cityRouter)
router.use('/cityDistrict', cityDistrictRouter)
router.use('/profile', authMiddleware, profileRouter)
router.use('/orderStatus', orderStatusRouter)
router.use('/basket', authMiddleware, basketRouter)
>>>>>>> ae759ab05419361e6d9530e429660e6de9027345

export default router