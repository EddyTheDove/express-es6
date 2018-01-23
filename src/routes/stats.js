import express from 'express'
import { StatController } from '../controllers'

const router = express.Router()
router.get('/monthly/:date', StatController.monthly)

export default router
