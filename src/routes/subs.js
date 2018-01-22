import express from 'express'
import { SubController } from '../controllers'

const router = express.Router()
router.post('/', SubController.store)
router.put('/:id', SubController.update)
router.delete('/:id', SubController.remove)

export default router
