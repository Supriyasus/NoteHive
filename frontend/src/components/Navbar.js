import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ fontWeight: "bold" }}>NoteHive</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        {!localStorage.getItem('token') ? (
                            <>
                                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                                <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
                            </>
                        ) : (
                            <button className="btn btn-primary mx-2" type="button" onClick={handleLogout}>Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;