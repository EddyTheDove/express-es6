// Global imports
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// local imports
import apiRoutes from './routes'

const PORT = process.env.PORT || 3000
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

// Connect to DB
mongoose.connect('mongodb://localhost:27017/finanz')

router.use((req, res, next) => {
    next()
})

app.use('/', express.static(__dirname + '/public'))

// router.get('/', function (req, res) {
//     res.json({ message: 'Welcome to our API' })
// })
app.use('/api', apiRoutes)

app.listen(PORT, () => {
    console.log(`App is listening on port ${ PORT }`)
})

export default app
