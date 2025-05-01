import { Router } from 'express'
import controller from '../controllers/Video'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.get)
router.get('/:id', controller.getOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

export default router