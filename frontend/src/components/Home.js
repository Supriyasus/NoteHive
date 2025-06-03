import Addnote from "./Addnote";
import Note from "./Note";

const Home = (props) => {

    return (
        <>
            <Addnote showAlert={props.showAlert}/>
            <Note showAlert={props.showAlert}/>
        </>
    );
}

export default Home;