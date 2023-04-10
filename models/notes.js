const mongoose = require('mongoose');
const Schema = mongoose.Schema

const notesSchema = new mongoose.Schema({
    item: { type: String },
    completed: Boolean,
},
    {   
        timestamps: true 
    }
)

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes