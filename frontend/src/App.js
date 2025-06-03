import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import NotesState from './context/notes/notesState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import React, { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 2000); // Hide after 2 seconds
  };
  return (
    <NotesState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home showAlert={showAlert} />
              </ProtectedRoute> } />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NotesState>

  );
}

export default App;
