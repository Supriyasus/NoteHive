import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes/notesContext';

const Addnote = (props) => {
    const { addNote } = useContext(NotesContext);

    // Local form state
    const [note, setNote] = useState({
        title: '',
        description: '',
        tag: ''
    });

    const handleOnChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,

        });
    };

    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag || "general");
        setNote({ title: "", description: "", tag: "" });
        if (props.showAlert) {
            props.showAlert("Note added!", "success");
        }
    };

    return (
        <div className="container my-3">
            <h2>Add New Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Enter Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={handleOnChange}
                    />
                </div>

                <button disabled={note.title.length === 0 || note.description.length === 0}
                    type="submit" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
            </form>
        </div>
    );
};

export default Addnote;
