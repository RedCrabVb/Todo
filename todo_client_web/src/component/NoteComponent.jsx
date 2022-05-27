import React from 'react'
import { routeNote } from "../utils/ScreenNames"
import { Link } from 'react-router-dom'

export const NoteComponent = ({ note, setCurrentNote, noteAll = '', setAllNote = ''}) => {

    const style = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minHeigth: '40px', 
        maxHeight: '70px', 
    }

    return (
        <>
            <div onClick={() => {setCurrentNote(note.id)}} 
               className="btn btn-outline-secondary" style={style}>
                {note.head}
            </div>
        </>
    )
};