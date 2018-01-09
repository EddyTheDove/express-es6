import express from 'express'
import EntryController from '../controllers/EntryController'
import { entryValidator } from '../validators'

const router = express.Router()

router.route('/')
.get(EntryController.list)
.post(entryValidator.store, EntryController.store)

export default router
