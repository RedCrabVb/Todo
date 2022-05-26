import React from 'react'
import { routeNote } from "../utils/ScreenNames"
import { Link } from 'react-router-dom'

export const NoteComponent = ({ note}) => {

    return (
        <div>
            <Link className="btn btn-primary mb-3 customButtons" to={`${routeNote}/${note.id}`}>{note.head}</Link>
        </div>
    )
};