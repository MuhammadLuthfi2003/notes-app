
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

//import css
import './styles/style.css';

//import components from components folder
import NoteForm from './components/inputForm';
import ActiveNotes from './components/activeNotes';
import ArchivedNotes from './components/archivedNotes';

//storage key
const STORAGE_KEY = 'notes';

//set modal element
ReactModal.setAppElement('#container');

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        
        //initialize state
        this.state = {
            notes: [],
            modalIsOpen: false,
            editedNotes: {
                title: '',
                body: '',
                remainingChars: 50,
            },
            editedNotesId: '',
            editedNotesDate: '',
        };

        //handler
        this.addNote = this.addNote.bind(this);
        this.archiveNote = this.archiveNote.bind(this);
        this.unarchiveNote = this.unarchiveNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.loadNote = this.loadNote.bind(this);
        this.editNote = this.editNote.bind(this);

        //binding modal handlers
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.transferData = this.transferData.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);

        //refs
        this.editTitle = React.createRef();
        this.editBody = React.createRef();
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
        }
    }

    //modal handlers
    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    //edit form change handlers
    handleTitleChange(event) {
        const title = event.target.value;
        const remainingChars = 50 - title.length;
        const body = this.editBody.current.value;

        this.editTitle.current.style.border = '1px solid #aaa';

        this.setState(() => {
            return {
                editedNotes: {
                    title: title,
                    body: body,
                    remainingChars: remainingChars,
                }
            }
        })

        if (remainingChars === 0) {
            this.setState(() => {
                return {
                    editedNotes: {
                        title: title,
                        body: body,
                        remainingChars: 'Max Input Characters Reached!',
                    }
                }
            })

            event.target.style.border = '1px solid red';
        }
    }

    handleBodyChange(event) {
        const title = this.editTitle.current.value;
        const remainingChars = this.state.editedNotes.remainingChars;
        const body = event.target.value

        this.editBody.current.style.border = '1px solid #aaa';

        this.setState(() => {
            return {
                editedNotes: {
                    title: title,
                    body: body,
                    remainingChars: remainingChars,
                }
            }
        })
    }

    handleEditSubmit(event) {
        event.preventDefault();

        const titleLength = this.editTitle.current.value.length;
        const bodyLength = this.editBody.current.value.length;

        if (titleLength > 0 && bodyLength > 0) {
            this.changeNote(this.state.editedNotesId, this.state.editedNotes.title, this.state.editedNotes.body);
            this.closeModal();
        }

        else if (titleLength === 0) {
            this.editTitle.current.style.border = '1px solid red';
            alert("Please Input The New Title!");
        }
        else if (bodyLength === 0) {
            this.editBody.current.style.border = '1px solid red';
            alert("Please Input The New Description!");
        }

    }

    changeNote(id, newTitle, newDesc) {
        //find the note
        const targetNote = this.state.notes.find(note => note.id === id);
        //change it with the new property
        targetNote.title = newTitle;
        targetNote.body = newDesc;
        //update the state
        this.setState({notes: this.state.notes});
        //update the storage
        this.updateNote(this.state.notes);

    }

    //transfers note data to edit form
    transferData(id) {
        const targetNote = this.state.notes.find(note => note.id === id);
        this.setState(() => {
            return {
                editedNotes: {
                    title: targetNote.title,
                    body: targetNote.body,
                    remainingChars: 50 - targetNote.title.length,
                },
                editedNotesId: targetNote.id,
                editedNotesDate: targetNote.createdAt,
            }
        });
    }

    // add feature to edit notes
    editNote(id) {
        this.transferData(id);
        this.openModal();
        
    }

    componentDidMount(){
        this.loadNote();
    }

    render() {
        return (
            <div className="container" >
                {/* modal to pop up edit form*/}
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose= {this.closeModal}
                    className='EditForm'
                    overlayClassName='Overlay'
                    preventScroll={true}
                >
                    <div className='EditForm-header'>
                        <h2>Edit Note</h2>
                        <button class='close-btn' onClick={this.closeModal}>&times;</button>
                    </div>
                    <div className='EditForm-body'>
                            <div className='note-input__title'>
                                <div className='note-input__title__char-limit edit-form-title'>
                                    Character Limit Remaining : <span>{this.state.editedNotes.remainingChars}</span>
                                </div>

                            </div>
                            <form className='note-input' onSubmit={this.handleEditSubmit}>
                                <input type="text" placeholder="Title" value={this.state.editedNotes.title} ref={this.editTitle} maxLength='50' onChange={this.handleTitleChange}/>
                                <textarea className="note-desc" placeholder="Description" value={this.state.editedNotes.body} ref={this.editBody} onChange={this.handleBodyChange}/>
                                <button type="submit">Edit Note</button>
                            </form>
                    </div>
                </ReactModal>

                <div>
                    <div className="notes-app">
                        <NoteForm addNote={this.addNote}/>
                        <ActiveNotes notes={this.state.notes} deleteNote={this.deleteNote} archiveNote={this.archiveNote} editNote={this.editNote}/>
                        <ArchivedNotes notes={this.state.notes} deleteNote={this.deleteNote} unarchiveNote={this.unarchiveNote}/>
                    </div>
                </div>
            </div>
        )
    }
}


const container = createRoot(document.getElementById('container'));
container.render(<NotesApp />);