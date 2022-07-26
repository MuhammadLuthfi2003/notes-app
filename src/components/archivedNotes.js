import React from 'react';

import ArchivedItem from './archiveItem';

function ArchivedNotes({notes, deleteNote, unarchiveNote}) {

    return (
        <div className="archived-notes">
            <h1 className="archived-notes__title">Archived Notes</h1>

                {
                //checks if there is a note which isnt archived
                 notes.some((note) => note.archived) 
                 //if there is, then                     
                    ? <ArchivedItem notes={notes} deleteNote={deleteNote} unarchiveNote={unarchiveNote}/>
                // else
                    : <div className="notes-list__empty-message">No notes</div>
                }

        </div>
    );


}

export default ArchivedNotes;