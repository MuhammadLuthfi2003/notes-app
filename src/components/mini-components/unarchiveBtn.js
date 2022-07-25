import React from 'react';

function UnarchiveButton({id, unarchiveNote}) {
    return (
        <button className="note-item__archive-button" onClick={() => unarchiveNote(id)}>Delete</button>
    )
}

export default UnarchiveButton;