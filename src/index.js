
import React from 'react';
import { createRoot } from 'react-dom/client';

//import css
import './styles/style.css';

//import components from components folder
import NoteForm from './components/inputForm';
import ActiveNotes from './components/activeNotes';
import ArchivedNotes from './components/archivedNotes';

//storage key
const STORAGE_KEY = 'notes';

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        
        //initialize state
        this.state = {
            notes: [],
        };

        //handler
        this.addNote = this.addNote.bind(this);
        this.archiveNote = this.archiveNote.bind(this);
        this.unarchiveNote = this.unarchiveNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.loadNote = this.loadNote.bind(this);
        this.editNote = this.editNote.bind(this);
    }

    addNote({title, body}) {
        const newNote = {
            id: +new Date(),
            title: title,
            body: body,
            createdAt: Date(),
            archived: false,
        };

        const updatedNotes = [...this.state.notes, newNote];

        this.updateNote(updatedNotes);

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

        this.updateNote(this.state.notes);
    }

    unarchiveNote(id) {
        const targetNote = this.state.notes.find(note => note.id === id);
        targetNote.archived = false;
        this.setState({notes: this.state.notes});

        this.updateNote(this.state.notes);  
    }

    deleteNote(id) {
        //check if user wants to delete the note
        const confr = window.confirm(`Are you sure you want to delete this note?`);

        if (confr) {
            const notes = this.state.notes.filter(note => note.id !== id);
            this.setState({notes: notes});
    
            this.updateNote(notes);
        }

    }

    //TODO
    // add feature to save in storage
    updateNote(notes) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        console.log('updated')
    }

    // add feature to load from storage
    loadNote() {
        if(typeof(Storage) !== 'undefined') {
            //check if it exists
            if(localStorage.getItem(STORAGE_KEY)) {
                const notes = JSON.parse(localStorage.getItem(STORAGE_KEY));
                this.setState({notes: notes});
            } else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.notes));

            }
            console.log('loaded!');
        }
    }

    // add feature to edit notes
    editNote(id) {
        const targetNote = this.state.notes.find(note => note.id === id);
        console.log(targetNote);
    }

    componentDidMount(){
        this.loadNote();
    }

    render() {
        return (
            <div className="notes-app" >
                <NoteForm addNote={this.addNote}/>
                <ActiveNotes notes={this.state.notes} deleteNote={this.deleteNote} archiveNote={this.archiveNote} editNote={this.editNote}/>
                <ArchivedNotes notes={this.state.notes} deleteNote={this.deleteNote} unarchiveNote={this.unarchiveNote}/>
            </div>
        )
    }
}


const container = createRoot(document.getElementById('container'));
container.render(<NotesApp />);