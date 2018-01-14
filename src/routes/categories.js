import express from 'express'
import { CategoryController } from '../controllers'
import { categoryValidator } from '../validators'

const router = express.Router()

router.route('/')
.get(CategoryController.userCategories)
.post(categoryValidator.store, CategoryController.store)

export default router
