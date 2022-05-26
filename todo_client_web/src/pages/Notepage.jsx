import React, { useEffect, useState } from "react"
import { note, server } from '../utils/Api'
import { getItem } from '../utils/OperationItem'
import { useNavigate, Link } from "react-router-dom"
import { ErrorView } from '../component/ErrorView'
import { NoteComponent } from '../component/NoteComponent'
import { Header } from "./Header"
import { routeEditNote } from '../utils/ScreenNames'

export const Note = () => {
    const [noteAll, setNoteAll] = useState([])
    const [error, setError] = useState({ enable: false, text: '' })

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true)
            getItem(setNoteAll, setError, note)
            console.log(JSON.stringify(noteAll))
        }
    }
    )


    return (
        <div>
            <Header />
            <ErrorView text={error.text} enable={error.enable} />
            <Link className="btn btn-primary mb-3 customButtons" to={`${routeEditNote}/-1`}>Создать заметку</Link>
            <br></br>
            <div className="containerItem m-3">
                <h1>Заметки</h1>
                {
                    noteAll.map(note => <NoteComponent note={note} key={note.id} navigation={navigate} />)
                }
            </div>
        </div>
    )
}