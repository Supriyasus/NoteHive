import React from "react";

const About = () => {
    return (
        <div className="container mt-5 mb-5">
            <h2>About NoteHive</h2>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            What is NoteHive?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>NoteHive is your personal cloud-based note-taking app.</strong> Create, edit, and organize your notes securely from anywhere. All your notes are private and accessible only to you after login.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            How does authentication work?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>Security is a priority at NoteHive.</strong> You must sign up or log in to access your notes. Your data is protected with authentication tokens, and only you can view or modify your notes.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            What features does NoteHive offer?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>NoteHive offers:</strong>
                            <ul>
                                <li>Easy note creation, editing, and deletion</li>
                                <li>Tagging and organizing your notes</li>
                                <li>Instant feedback with alerts for all actions</li>
                                <li>Secure access with login and signup</li>
                                <li>Responsive design for all devices</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;