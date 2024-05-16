import express from 'express'
import controller from './controller'
const router = express.Router();

router.post('/get',controller.findAll)
router.get('/:id',controller.findOne)
router.post('/create',controller.create)
router.put('/',controller.update)
router.delete('/:id',controller.delete)

router.post('/appendProductType',controller.appendProductType)
router.post('/removeProductType',controller.removeProductType)
router.post('/appendProduct',controller.appendProduct)
router.post('/removeProduct',controller.removeProduct)

export default router;