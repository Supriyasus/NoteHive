import React, { useContext, useRef, useState } from 'react';
import NotesContext from '../context/notes/notesContext';
import Noteitem from './Noteitem';

const Note = (props) => {
    const ref = useRef(null);
    const refClose = useRef(null);
    const context = useContext(NotesContext);
    const { notes, editNote } = context;

    const [note, setNote] = useState({
        eid: '',
        etitle: '',
        edescription: '',
        etag: ''
    });

    const handleOnChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditSave = (e) => {
        e.preventDefault();
        editNote(note.eid, note.etitle, note.edescription, note.etag || 'general');
        refClose.current.click(); // Close modal
        if (props.showAlert) {
            props.showAlert("Note updated successfully!", "success");
        }
    };

    const updateNote = (currentNote) => {
        setNote({
            eid: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
        ref.current.click(); // Open the modal after setting state
    };

    return (
        <>
            {/* Hidden button to trigger modal */}
            <button
                type="button"
                ref={ref}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
            >
                Launch modal
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id="editModal"
                tabIndex="-1"
                aria-labelledby="editModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">
                                Edit Note
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        value={note.etitle}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        value={note.edescription}
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        value={note.etag}
                                        onChange={handleOnChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={refClose}
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleEditSave}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes Display */}
            <div className="row my-3">
                <h2 className="notes-heading">
                    Your Notes
                </h2>
                {notes && notes.length === 0 && (
                    <p className="notes-empty">
                        No notes to display
                    </p>
                )}
                {notes.map((note) => (
                    <Noteitem
                        key={note._id}
                        note={note}
                        updateNote={updateNote}
                        showAlert={props.showAlert}
                    />
                ))}
            </div>
        </>
    );
};

export default Note;