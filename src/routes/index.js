import express from 'express'
import entries from './entries'

// Router
const router = express.Router()

// Routes
router.use('/entries', entries)


export default router
