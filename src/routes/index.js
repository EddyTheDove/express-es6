import express from 'express'
import passport from 'passport'
import authRoutes from './auth'
import usersRoutes from './users'
import entriesRoutes from './entries'
import passportStrategy from '../helpers/passport'

// Router
const app = express()
const router = express.Router()

// Initialize passport
app.use(passport.initialize())

// Routes
router.use('/auth', authRoutes)

// Protect subsequent routes
router.use( (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (!user) {
            console.log('No user found in JWT', info);
            return res.status(401).send('Unauthorized')
        }
        next()
    })(req, res, next)
})

router.use('/users', usersRoutes)
router.use('/entries', entriesRoutes)

export default router
