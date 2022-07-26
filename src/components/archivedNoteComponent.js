import React from 'react';
import UnarchiveBtn from './mini-components/unarchiveBtn';
import DeleteBtn from './mini-components/deleteBtn'
import { showFormattedDate } from '../data/data';

function ArchivedNoteComponent({id, title, body, createdAt , deleteNote, unarchiveNote}) {
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
                    <UnarchiveBtn id={id} className='note-item__archive-button' unarchiveNote={unarchiveNote} />
                    <DeleteBtn id={id} className='note-item__delete-button' deleteNote={deleteNote} />
                </div>
            </div>




        </div>
    )
}
export default ArchivedNoteComponent;