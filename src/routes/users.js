import express from 'express'
import { UserController } from '../controllers'

const router = express.Router()

router.route('/')
.get(UserController.list)

export default router
