import express from 'express'
import passport from 'passport'
import UserController from '../controllers/UserController'

const router = express.Router()

router.route('/')
.get(UserController.list)

export default router
