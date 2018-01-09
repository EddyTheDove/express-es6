import express from 'express'
import AuthController from '../controllers/AuthController'
import { userValidator } from '../validators'

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/register', userValidator.register, AuthController.register)

export default router
