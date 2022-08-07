var express = require('express')
var dotenv = require('dotenv')
var colors = require('colors')
var cors = require('cors')
var connectDB = require('./config/db.js')
var bodyParser = require('body-parser')
var { notFound, errorHandler } = require('./middleware/errorMiddleware.js')

//import { notFound, errorHandler } from './middleware/errorMiddleware.js'

var lettermenRoutes = require('./routes/lettermenRoutes.js')

dotenv.config()

connectDB()
const app = express()

var jsonParser = bodyParser.json()

app.use(jsonParser)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use(cors())

app.use('/api/v1/lettermen', lettermenRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
)