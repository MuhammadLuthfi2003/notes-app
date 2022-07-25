import React from 'react';
import { createRoot } from 'react-dom/client';

//import css
import './styles/style.css';

//import components from components folder
import NoteForm from './components/inputForm';
import ActiveNotes from './components/activeNotes';
import ArchivedNotes from './components/archivedNotes';

//get data from storage in previous sessions
const {notes, showFormattedDate : showDate} = require('./data/data');

const STORAGE_KEY = 'notes';

function isStorageExist() {
    if (typeof(Storage) === "undefined") {
        return false;
    }
    return true;
}

class NotesApp extends React.Component {
    constructor(props) {
        super(props);

        const archivedNotes = notes.filter(note => note.archived);
        const activeNotes = notes.filter(note => !note.archived);
        
        //initialize state
        this.state = {
            notes: notes,
            activeNotes: activeNotes,
            archivedNotes: archivedNotes,
        };

        //handler
        this.addNote = this.addNote.bind(this);
        this.archiveNote = this.archiveNote.bind(this);
        this.unarchiveNote = this.unarchiveNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.loadStorage = this.loadStorage.bind(this);
    }

    addNote({title, body}) {
        const newNote = {
            id: +new Date(),
            title: title,
            body: body,
            createdAt: Date(),
            archived: false,
        };

        this.setState((prevState) => {
            return {
                notes: [...prevState.notes, newNote]
            }
        })
    }

    archiveNote(id) {

    }

    unarchiveNote(id) {

    }

    deleteNote(id) {

    }

    loadStorage() {
        if (isStorageExist()) {
            if (localStorage.getItem(STORAGE_KEY) !== null) {
                this.state.notes.push(...JSON.parse(localStorage.getItem(STORAGE_KEY)));
            }
            else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.notes));
            }
        }
    }

    render() {
        return (
            <div className="notes-app" onLoad={this.props.loadStorage} >
                <NoteForm />
                <ActiveNotes />
                <ArchivedNotes />
            </div>
        )
    }
}


const container = createRoot(document.getElementById('container'));
container.render(<NotesApp />);