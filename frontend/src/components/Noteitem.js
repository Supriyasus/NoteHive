import NotesContext from "../context/notes/notesContext";
import React, { useContext } from 'react';

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(NotesContext);
    const { deleteNote, } = context;

    const handleDelete = () => {
        deleteNote(note._id);
        if (props.showAlert) {
            props.showAlert("Note deleted!", "success");
        }
    };

    if (!note) {
        return <div>No note available</div>;
    }
    return (
        <div className='col-md-3'>
            <div key={note._id} className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={() => {handleDelete(note._id) }}></i>
                    <i className="fa-solid fa-pen mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
