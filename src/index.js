import mongoose from 'mongoose'
import config from '../config'
import app from './server'

// Connect to DB
mongoose.connect(config.mongodb)
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongodb}`)
})

// Launch server
if (!module.parent) {
    app.listen(config.port, () => {
        console.log(`App is listening on port ${ config.port }`)
    })
}

export default app
