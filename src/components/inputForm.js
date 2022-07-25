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
            body: '',
            createdAt: '',
            archived: false,
        };

        //handlers
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //event handlers
    handleTitleChange(event) {
        
        const title = event.target.value;
        const titleCharsRemaining = 50 - title.length;
        this.setState(() => {
            return {
                formTitleCharsRemaining: titleCharsRemaining
            }
        });

        event.target.style.border = '1px solid #aaa';

        //prevent input after 50 characters have passed
        if (titleCharsRemaining === 0) {
            this.setState(() => {
                return {
                    formTitleCharsRemaining: 'Max Input Characters Reached!'
                }
            })

            event.target.style.border = '1px solid red';
        }

        //set state for title
        this.setState(() => {
            return {
                title: title
            }
        })
    }

    handleBodyChange(event) {
        this.setState(() => {
            return {
                body: event.target.value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
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
                            Character Limit Remaining : <span>{this.state.formTitleCharsRemaining}</span>
                        </div>
                    </div>
                    <form className="note-input" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Title" onChange={this.handleTitleChange} maxLength='50' id='inputTitle'/>
                        <textarea className="note-desc" placeholder="Description"  onChange={this.handleBodyChange}/>
                        <button type="submit">Create Note</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NoteForm;