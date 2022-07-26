import React from 'react';
import ArchivedNoteComponent from './archivedNoteComponent';

function ArchivedItem({notes}) {
    return (
        <div className="notes-list">
            {
                notes.map((note) => {
                    if(note.archived) {
                        return <ArchivedNoteComponent key={note.id} {...note} />
                    }
                })
            }
        </div>
    );
}