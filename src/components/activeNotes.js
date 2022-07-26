import React from 'react';

import ActiveItem from './activeItem';

function ActiveNotes({notes, deleteNote, archiveNote}) {

    return (
        <div className="active-notes">
            <h1 className="active-notes__title">Active Notes</h1>
                {
                //checks if there is a note which isnt archived
                 notes.some((note) => !note.archived) 
                 //if there is, then                     
                    ? <ActiveItem notes={notes} deleteNote={deleteNote} archiveNote={archiveNote}/>
                // else
                    : <div className="notes-list__empty-message">No notes</div>
                }
        </div>
    );
    

}

export default ActiveNotes;