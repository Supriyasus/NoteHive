import React,{useContext} from "react";
import NotesContext from "../context/notes/notesContext";

const About = () => {
    const a=useContext(NotesContext);
    return (
        <div>
            <p>This is about {a.name}</p>
        </div>
    )
}
export default About;