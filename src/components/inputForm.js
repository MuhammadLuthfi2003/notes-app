import React from 'react';


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

        //refs
        this.titleInput = React.createRef();
        this.bodyInput = React.createRef();
    }

    //event handlers
    handleTitleChange(event) {
        
        const title = event.target.value;
        const titleCharsRemaining = 50 - title.length;

        this.titleInput.current.style.border = '1px solid #aaa';

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
        this.bodyInput.current.style.border = '1px solid #aaa';

        this.setState(() => {
            return {
                body: event.target.value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        //get value
        const titleLength = this.titleInput.current.value.length;
        const bodyLength = this.bodyInput.current.value.length;

        if (titleLength > 0 && bodyLength > 0) {
            this.props.addNote(this.state);
        }
        else if (titleLength === 0) {
            this.titleInput.current.style.border = '1px solid red';
            alert("Please input title")
            
        }
        else if (bodyLength === 0) {
            this.bodyInput.current.style.border = '1px solid red';
            alert("Please input description")
        }
    }

    render() {
        return (
            <div>
                <div className='note-app__header'>
                    <h1 className='credit-title'><a href='https://github.com/MuhammadLuthfi2003/notes-app' target='blank'>Notes App</a></h1>
                    <h3 className='credit-title'>By <a href='https://github.com/MuhammadLuthfi2003' target='blank'>@MuhammadLuthfi2003</a></h3>
                </div>
                <div className="note-app__body">
                    <h2>Add Note</h2>
                    <div className="note-input__title">
                        <div className="note-input__title__char-limit">
                            Character Limit Remaining : <span>{this.state.formTitleCharsRemaining}</span>
                        </div>
                    </div>
                    <form className="note-input" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Title" onChange={this.handleTitleChange} maxLength='50' id='inputTitle' ref={this.titleInput}/>
                        <textarea className="note-desc" placeholder="Description"  onChange={this.handleBodyChange} ref={this.bodyInput}/>
                        <button type="submit">Create Note</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NoteForm;