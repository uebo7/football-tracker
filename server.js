//dependencies

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const logger = require('morgan')
const teamsRouter = require('./controllers/teams')
const playersRouter = require('./controllers/players')

//init app

const app = express()

//config settings

require('dotenv').config()
const PORT = process.env.PORT
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL)

//callback functions

const db = mongoose.connection
db.on('error', function(err) {
    console.log('Error ' + err.message)
})
db.on('connected', function() {
    console.log('mongoDB connected')
})

//middleware

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(logger('dev'))

//routes
app.get('/', function(req, res) {
    res.redirect('/teams');
})

app.use(playersRouter)
app.use(teamsRouter)

//listen

app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
})