import React from 'react';
import ArchivedNoteComponent from './archivedNoteComponent';

function ArchivedItem({notes, deleteNote, unarchiveNote}) {
    return (
        <div className="notes-list">
            {
                notes.map((note) => {
                    if(note.archived) {
                        return <ArchivedNoteComponent key={note.id} {...note} deleteNote={deleteNote} unarchiveNote={unarchiveNote}/>
                    }
                })
            }
        </div>
    );
}

export default ArchivedItem;