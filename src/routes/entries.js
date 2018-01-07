import express from 'express'
import EntryController from '../controllers/EntryController'
import EntryPolicy from '../policies/EntryPolicy'

const router = express.Router()

router.route('/')
.get(EntryController.list)
.post(EntryPolicy.store, EntryController.store)

export default router
