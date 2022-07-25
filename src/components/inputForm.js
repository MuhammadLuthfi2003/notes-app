import React from 'react';

//import notes
const {notes} = require('../data/data');

class NoteForm extends React.Component {
    constructor(props){
        super(props);

        //initialize state
        this.state = {
            formTitleCharsRemaining: 50,
            title: '',
            
        };
    }

    render() {
        return (
            <div>
                <div className='note-app__header'>
                    <h1>Notes App</h1>
                </div>
                <div className="note-app__body">
                    <h2>Add Note</h2>
                    <div className="note-input__title">
                        <div className="note-input__title__char-limit">
                            Character Limit : 50
                        </div>
                    </div>
                    <form className="note-input">
                        <input type="text" placeholder="Title" />
                        <textarea className="note-desc" placeholder="Description" />
                        <button type="submit">Create Note</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NoteForm;