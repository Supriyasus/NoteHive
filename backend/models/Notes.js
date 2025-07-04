const mongoose= require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
        default: "Untitled Note"
    },
    description: {
        type: String,
        required: true,
        default: "No description provided"
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Note', NoteSchema);