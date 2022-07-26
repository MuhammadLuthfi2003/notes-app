import React from 'react';

function ArchiveButton({id, archiveNote}) {
    return (
        <button className="note-item__archive-button" onClick={() => archiveNote(id)}>Archive</button>
    )
}

export default ArchiveButton;