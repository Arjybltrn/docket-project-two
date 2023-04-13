// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
require('dotenv').config()

// PORT
const PORT = process.env.PORT || 3000

// Configure express.static for css
app.use(express.static('public')) 

// STRING CONNECTION
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Use public folder for static assets
app.use(express.static('public'));

// Middlewares
app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(methodOverride('_method'))

// Routes / Controllers

const notesController = require('./controllers/notes')
app.use('/notes', notesController)


app.get('/', (req, res) => {
    res.render('index.ejs')
})
// Listener
    app.listen(PORT, () => console.log('express is listening on:', PORT));

