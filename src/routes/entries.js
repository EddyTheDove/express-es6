import express from 'express'
import { EntryController } from '../controllers'
import { entryValidator } from '../validators'

const router = express.Router()

router.route('/')
.get(EntryController.userEntries)
.post(entryValidator.store, EntryController.store)

router.route('/:id')
.delete(EntryController.remove)

export default router
