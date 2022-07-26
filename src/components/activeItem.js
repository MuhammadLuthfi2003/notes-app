import React from 'react';
import ActiveNoteComponent from './activeNoteComponent';

function ActiveItem({notes}) {
    return (
        <div className="notes-list">
            {
                notes.map((note) => {
                    if(!note.archived) {
                        return <ActiveNoteComponent key={note.id} {...note} />
                    }
                })
            }
        </div>
    );
}

export default ActiveItem;