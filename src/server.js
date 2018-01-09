// Global imports
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'

// local imports
import apiRoutes from './routes'

const app = express()
const router = express.Router()

// Use morgan to log requests to the console
app.use(morgan('dev'))
app.use(cors ({ exposedHeaders: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Set view engine
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))

app.use('/', express.static(__dirname + '/public'))
app.use('/api', apiRoutes)

export default app
