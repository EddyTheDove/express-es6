import express from 'express'
import passport from 'passport'
import subRoutes from './subs'
import authRoutes from './auth'
import statsRoutes from './stats'
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


router.use('/subs', subRoutes)
router.use('/users', usersRoutes)
router.use('/stats', statsRoutes)
router.use('/entries', entriesRoutes)
router.use('/categories', categoriesRoutes)

export default router
