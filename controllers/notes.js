const express = require('express')
const mongoose = require("mongoose")
const notesRouter = express.Router()
const Notes = require('../models/notes.js')


// STRING CONNECTION
mongoose.connect(process.env.MONGODB_URI);

// Middleware
// Body parser middleware: give us access to req.body
notesRouter.use(express.urlencoded({ extended: false }));



// INDEX
notesRouter.get('/', async(req, res) => {
    const allNotes = await Notes.find({})
    res.render('notes/index.ejs', {notes: allNotes})
})
// N 
// DELETE
notesRouter.delete('/:id', async (req, res) => {
    await Notes.findByIdAndRemove(req.params.id)
    res.redirect('/notes')
})

//UPDATE
notesRouter.put('/:id', async(req, res) => {
    await Notes.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/notes')
})

// CREATE
notesRouter.post('/', (req, res) => {
    const createdNote = new Notes(req.body) 
    createdNote.save().then(res.redirect('/notes'))
    // res.render({note:createdNote})
    })

// EDIT
notesRouter.get('/:id/edit', async(req, res) => {
    const foundNote = await Notes.findById(req.params.id)
    res.render('notes/edit.ejs', {note:foundNote})
    
})
// S

// EXPORT
module.exports = notesRouter