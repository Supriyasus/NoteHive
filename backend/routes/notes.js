const express=require('express');
const router=express.Router();
const fetchuser=require('../middlewares/fetchuser');
const Notes=require('../models/Notes');

// ROUTE 1: Get all notes of a user at api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 2: Add a new note at api/notes/addnote
router.post('/addnote', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 3: Update an existing note at api/notes/updatenote/:id after checking if the user is authorized
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not Found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 4: Delete a note at api/notes/deletenote/:id after checking if the user is authorized
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send('Not Found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;