import React from 'react'
import {routeEditNote} from "../utils/ScreenNames"
import {Link} from 'react-router-dom'

export const NoteComponent = ({note, navigation, disabled = false}) => {

    return (
        <div>
            <Link className="btn btn-primary mb-3 customButtons" to={`${routeEditNote}/${note.id}`}>{note.head}</Link>
        </div>
    )
};