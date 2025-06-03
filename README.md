# NoteHive

NoteHive is a simple, secure, and responsive cloud-based note-taking app built with React and Bootstrap.  
Create, edit, and organize your notes from anywhere. All your notes are private and accessible only to you after login.

---

## Features

- **User Authentication:** Sign up and log in securely. Only you can access your notes.
- **CRUD Notes:** Create, read, update, and delete notes easily.
- **Tagging:** Organize your notes with tags.
- **Instant Alerts:** Get feedback for all actions (add, edit, delete, login, signup).
- **Responsive Design:** Works on all devices.
- **Bootstrap UI:** Clean and modern interface.

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- Backend API running (see below)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/notehive.git
    cd notehive/frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```
    The app will run at [http://localhost:3000](http://localhost:3000).

---

## Backend Setup

NoteHive requires a backend server for authentication and note storage.  
You can use the provided Express.js backend or your own API.  
Make sure the backend runs at `http://localhost:5000` or update the `host` variable in the frontend code.

---

## Folder Structure

```
frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── context/
  │   ├── App.js
  │   ├── App.css
  │   └── index.js
  └── package.json
```

---

## Scripts

- `npm start` — Run the app in development mode
- `npm run build` — Build for production
- `npm test` — Run tests

---

## Customization

- Update the backend API URL in the frontend if needed.
- You can further style the app using Bootstrap or your own CSS.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Credits

- Built with [React](https://reactjs.org/) and [Bootstrap](https://getbootstrap.com/)
- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
