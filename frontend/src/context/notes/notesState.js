import NotesContext from "./notesContext";
import React, { useState, useEffect } from "react";

const NotesState = (props) => {
    const host = "http://localhost:5000";
    const initial = [
  {
    "_id": "683e94de3f1a1b4c0d19a048",
    "user": "683c2dfbda592b450bd341c4",
    "title": "Todo",
    "description": "Get her cake",
    "tag": "general",
    "date": "2025-06-03T06:23:26.572Z",
    "__v": 0
  },
  {
    "_id": "683ea0f43f1a1b4c0d19a060",
    "user": "683c2dfbda592b450bd341c4",
    "title": "Project Kickoff",
    "description": "Met with the team to discuss project goals and deliverables.",
    "tag": "work",
    "date": "2025-06-03T07:15:00.900Z",
    "__v": 0
  },
  {
    "_id": "683ea0fc3f1a1b4c0d19a062",
    "user": "683c2dfbda592b450bd341c4",
    "title": "Book to Read",
    "description": "Add 'Atomic Habits' to my reading list.",
    "tag": "personal",
    "date": "2025-06-03T07:15:08.273Z",
    "__v": 0
  },
  {
    "_id": "683ea19f3f1a1b4c0d19a069",
    "user": "683c2dfbda592b450bd341c4",
    "title": "Coding",
    "description": "complete it",
    "tag": "work",
    "date": "2025-06-03T07:17:51.933Z",
    "__v": 0
  }
]
    const [notes, setNotes] = useState(initial);

useEffect(() => {
    const fetchNotes = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Optionally clear notes or handle unauthenticated state
            setNotes([]);
            return;
        }
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        });
        if (response.ok) {
            const data = await response.json();
            setNotes(Array.isArray(data) ? data : []);
        } else {
            setNotes([]); // Clear notes on 401 or error
        }
    };
    fetchNotes();
}, []);

    // Add a new note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const newNote = await response.json();
        setNotes(notes.concat(newNote));
    }

    // Edit an existing note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            if (note._id === id) {
                const updatedNote = { ...note, title, description, tag };
                const updatedNotes = [...notes];
                updatedNotes[i] = updatedNote;
                setNotes(updatedNotes);
                break;
            }
        }
    }

    // Delete a note
    const deleteNote = async (id) => {
    try {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        // Remove from UI regardless of backend response
        const updatedNotes = notes.filter(note => note._id !== id);
        setNotes(updatedNotes);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Deleted note response:", json);

    } catch (error) {
        console.error('Error deleting note:', error);
    }
};


    return (
        <NotesContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NotesContext.Provider>
    );
}

export default NotesState;

