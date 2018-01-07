import express from 'express'
import AuthController from '../controllers/AuthController'
import UserPolicy from '../policies/UserPolicy'

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/register', UserPolicy.validate, AuthController.register)

export default router
