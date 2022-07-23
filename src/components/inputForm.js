import React from 'react';

//import notes
import notes from '../data/data';

class NoteForm extends React.Component {
    constructor(props){
        super(props);

        //initialize state
        this.state = notes;
    }

    render() {
        return (
            <div>
                <div className='note-nav'>
                    <h1>Notes App</h1>
                </div>
                <div className="note-form">
                    <h1>Note Form</h1>
                    <h2>Add Note</h2>
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