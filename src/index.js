import React from 'react';
import { createRoot } from 'react-dom/client';

//import css
import './styles/style.css';

//import components from components folder
import NoteForm from './components/inputForm';
import ActiveNotes from './components/activeNotes';
import ArchivedNotes from './components/archivedNotes';

//get data from storage in previous sessions
const {notes, showFormattedDate, updateStorage, getStorage} = require('./data/data');


class NotesApp extends React.Component {
    constructor(props) {
        super(props);

        const archivedNotes = notes.filter(note => note.archived);
        const activeNotes = notes.filter(note => !note.archived);
        
        //initialize state
        this.state = notes;
    }

    render() {
        return (
            <div>
                <NoteForm />
                <ActiveNotes />
                <ArchivedNotes />
            </div>
        )
    }
}

console.log(notes);

const container = createRoot(document.getElementById('container'));
container.render(<NotesApp />);