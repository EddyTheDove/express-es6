import mongoose from './models/mongoose'
import config from './config'
import app from './server'
import moment from 'moment'

// Connect to DB
mongoose.connect(config.mongodb)
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.mongodb}`)
})

// Launch server
if (!module.parent) {
    app.listen(config.port, () => {
        console.log(`App is listening on port ${ config.port } : ${ moment().format('HH:mm:ss') }`)
    })
}

export default app
