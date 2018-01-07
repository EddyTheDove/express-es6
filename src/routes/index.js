import express from 'express'
import auth from './auth'
import users from './users'
import entries from './entries'

// Router
const router = express.Router()

// Routes
router.use('/auth', auth)
router.use('/users', users)
router.use('/entries', entries)

export default router
