import express from 'express'
import controller from './controller'
const router = express.Router();

router.post('/makeOrder', controller.makeOrder)
router.get('/getOrders', controller.getOrders)
router.get('/getOrder/:id', controller.getOrder)

export default router;