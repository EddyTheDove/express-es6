import express from 'express'
import { UserController } from '../controllers'

const router = express.Router()

router.route('/').get(UserController.list)
router.get('/balance', UserController.balance)

export default router
