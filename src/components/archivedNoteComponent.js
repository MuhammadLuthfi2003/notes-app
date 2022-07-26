import React from 'react';
import UnarchiveBtn from './mini-components/unarchiveBtn';
import DeleteBtn from './mini-components/deleteBtn'
import { showFormattedDate } from '../data/index';

function ArchivedNoteComponent({id, title, body, createdAt}) {
    return (
        <div className='note-item'>
            <div className='note-item__content'>
                <div className='note-item__title'>
                    {title}
                </div>
            </div>

            <div className='note-item__date'>
                {showFormattedDate(createdAt)}
            </div>

            <div className='note-item__body'>
                {body}
            </div>

            <div className='note-item__actions'>
                <UnarchiveBtn id={id} />
                <DeleteBtn id={id} />
            </div>


        </div>
    )
}
export default ArchivedNoteComponent;