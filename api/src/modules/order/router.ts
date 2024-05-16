import express from 'express'
import controller from './controller'
import { adminMiddleware } from '../../middlewares/admin.middleware';
const router = express.Router();

router.get('/', adminMiddleware, controller.findAll)
router.post('/setStatus', adminMiddleware, controller.setStatus)

export default router;