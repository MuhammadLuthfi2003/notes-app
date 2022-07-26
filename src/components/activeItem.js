import React from 'react';
import ActiveNoteComponent from './activeNoteComponent';

function ActiveItem({notes, deleteNote, archiveNote, editNote}) {
    return (
        <div className="notes-list">
            {
                notes.map((note) => {
                    if(!note.archived) {
                        return <ActiveNoteComponent key={note.id} {...note} deleteNote={deleteNote} archiveNote={archiveNote} editNote={editNote}/>
                    }
                })
            }
        </div>
    );
}

export default ActiveItem;