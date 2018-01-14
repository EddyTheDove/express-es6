import express from 'express'
import passport from 'passport'
import authRoutes from './auth'
import usersRoutes from './users'
import entriesRoutes from './entries'
import categoriesRoutes from './categories'
import passportStrategy from '../helpers/passport'
import { AuthMiddleware, ActiveMiddleware } from '../middlewares'

// Router
const app = express()
const router = express.Router()

// Initialize passport
app.use(passport.initialize())

// Authentication Routes (sign up & sign in)
router.use('/auth', authRoutes)

// Authentication middleware
router.use(AuthMiddleware)

// Only active account can access subsequent routes
router.use(ActiveMiddleware)


router.use('/users', usersRoutes)
router.use('/entries', entriesRoutes)
router.use('/categories', categoriesRoutes)

export default router
