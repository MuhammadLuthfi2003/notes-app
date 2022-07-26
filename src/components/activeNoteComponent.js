import React from 'react';
import ArchiveButton from './mini-components/archiveBtn';
import DeleteButton from './mini-components/deleteBtn'
import { showFormattedDate } from '../data/data';

function activeNoteComponent({id, title, body, createdAt , deleteNote, archiveNote}) {
    return (
        <div className='note-item'>
            <div className='note-item__content'>
                <div className='note-item__title'>
                    {title}
                </div>

                <div className='note-item__date'>
                    {showFormattedDate(createdAt)}
                </div>

                <div className='note-item__body'>
                    {body}

                </div>

                <div className='note-item__action'>
                        <ArchiveButton className='note-item__archive-button' id={id} archiveNote={archiveNote}/>
                        <DeleteButton className='note-item__delete-button' id={id} deleteNote={deleteNote}/>
                </div>
                
            </div>
        </div>
    )
}

export default activeNoteComponent;
