import express from 'express'
import { AuthController } from '../controllers'
import { userValidator } from '../validators'
import { AuthMiddleware, ActiveMiddleware } from '../middlewares'

const router = express.Router()

router.get('/', AuthMiddleware, ActiveMiddleware, AuthController.auth)
router.post('/login', AuthController.login)
router.post('/register', userValidator.register, AuthController.register)

export default router
