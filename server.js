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


// //   <button>
// <a href="/notes/<%=note._id %>/edit" 
// onclick="window.open('/notes/<%=note._id %>/edit',
// 'newwindow',
// 'width=300, height=250')
// return false">Edit task</a></button>

/* <button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-green">Open Modal</button>

<div id="id01" class="w3-modal">
  <div class="w3-modal-content">
    <div class="w3-container">
      <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-display-topright">&times;</span>
      <p><%=note.item%> </p>
    </div>
  </div>
</div> */