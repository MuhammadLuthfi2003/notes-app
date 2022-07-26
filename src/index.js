// Nama : Muhammad Luthfi Azzahra Rammadhani
// Kelas : Belajar Membuat Aplikasi Web dengan React

import React from 'react';
import { createRoot } from 'react-dom/client';

//import css
import './styles/style.css';

//import components from components folder
import NoteForm from './components/inputForm';
import ActiveNotes from './components/activeNotes';
import ArchivedNotes from './components/archivedNotes';


import {getInitialData} from './data/index';

const notes= getInitialData();

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        
        //initialize state
        this.state = {
            notes: notes,
        };

        //handler
        this.addNote = this.addNote.bind(this);
        this.archiveNote = this.archiveNote.bind(this);
        this.unarchiveNote = this.unarchiveNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
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
        const targetNote = this.state.notes.find(note => note.id === id);
        targetNote.archived = true;
        this.setState({notes: this.state.notes});
    }

    unarchiveNote(id) {
        const targetNote = this.state.notes.find(note => note.id === id);
        targetNote.archived = false;
        this.setState({notes: this.state.notes});
    }

    deleteNote(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({notes: notes});
    }

    render() {
        return (
            <div className="notes-app" >
                <NoteForm addNote={this.addNote}/>
                <ActiveNotes notes={this.state.notes} deleteNote={this.deleteNote} archiveNote={this.archiveNote}/>
                <ArchivedNotes notes={this.state.notes} deleteNote={this.deleteNote} unarchiveNote={this.unarchiveNote}/>
            </div>
        )
    }
}


const container = createRoot(document.getElementById('container'));
container.render(<NotesApp />);