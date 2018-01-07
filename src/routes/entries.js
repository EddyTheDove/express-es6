import express from 'express'
import entryController from '../controllers/entry.controller'
const router = express.Router()

router.route('/')
.get(entryController.list)
.post(entryController.store)

export default router
