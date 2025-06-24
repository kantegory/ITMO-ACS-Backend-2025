import { Router } from 'express'
import controller from '../controllers/User'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.get)
router.get('/:id', controller.getOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)
router.get('/email/:email', controller.getByEmail)

export default router