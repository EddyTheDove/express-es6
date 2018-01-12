import express from 'express'
import passport from 'passport'
import authRoutes from './auth'
import usersRoutes from './users'
import entriesRoutes from './entries'
import passportStrategy from '../helpers/passport'
import { AuthMiddleware } from '../middlewares'

// Router
const app = express()
const router = express.Router()

// Initialize passport
app.use(passport.initialize())

// Authentication Routes (sign up & sign in)
router.use('/auth', authRoutes)

// Authentication middleware
router.use(AuthMiddleware)


router.use('/users', usersRoutes)
router.use('/entries', entriesRoutes)

export default router
