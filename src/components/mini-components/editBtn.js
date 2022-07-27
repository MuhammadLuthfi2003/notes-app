import React from 'react';


function EditButton({id, editNote}) {
    return (
        <button className="note-item__edit-button" onClick={() => editNote(id)}>Edit</button>
    )
}

export default EditButton;
