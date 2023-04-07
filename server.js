// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const port = 3000
require('dotenv').config()

// STRING CONNECTION
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Use publick folder for static assets
app.use(express.static('public'));

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


// 
app.get('/',(req,res) => {
    res.send('Welcome to DOCKET')
})

// Listener 
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})