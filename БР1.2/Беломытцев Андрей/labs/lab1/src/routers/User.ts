import { Router } from 'express'
import controller from '../controllers/User'
import extractJWT from '../middleware/extractJWT'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.get)
router.get('/validate', extractJWT, controller.validateToken)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/email/:email', controller.getByEmail)
router.get('/:id', controller.getOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

export default router