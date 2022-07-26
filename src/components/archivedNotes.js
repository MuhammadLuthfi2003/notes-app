import React from 'react';

import ArchivedNoteComponent from './archivedNoteComponent';

function ArchivedNotes({notes}){

    return (
        <div className="archived-notes">
            <h1 className="archived-notes__title">Archived Notes</h1>

                {
                //checks if there is a note which isnt archived
                 notes.some((note) => note.archived) 
                 //if there is, then                     
                    ? <ArchivedNoteComponent notes={notes} />
                // else
                    : <div className="notes-list__empty-message">No notes</div>
                }

        </div>
    );


}

export default ArchivedNotes;