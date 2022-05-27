import React, { useEffect, useState } from "react"
import { note, server } from '../utils/Api'
import { getItem } from '../utils/OperationItem'
import { ErrorView } from '../component/ErrorView'
import { NoteComponent } from '../component/NoteComponent'
import { Header } from "./commons/Header"
import { NOTE } from "../utils/Storage"
import {NoteEdit} from './NoteEditPage'
import { styleBlockItem, styleContainerItem, styleItems} from './commons/css/item'

export const Note = () => {
    const [noteAll, setNoteAll] = useState([])
    const [currentNote, setCurrentNote] = useState(undefined)
    const [error, setError] = useState({ enable: false, text: '' })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true)
            getItem(setNoteAll, setError, note, NOTE)
            console.log(JSON.stringify(noteAll))
        }
    })

    function funcLoadItem() {
        getItem(setNoteAll, setError, note, NOTE)
    }


    return (
        <>
            <Header />
            <ErrorView text={error.text} enable={error.enable} />
            <br></br>
            <div className="container" style={styleContainerItem}>
                <div className="row" >
                    <div className="col-2 m-1" style={styleBlockItem}>
                        <button style={{height: '60px'}} className="btn btn-outline-primary mb-3 customButtons" onClick={() => { setCurrentNote(-1) }} >+ cоздать заметку</button>
                        <div style={styleItems}>
                            {
                                noteAll.map(note => <NoteComponent note={note} setCurrentNote={setCurrentNote} key={note.id} />)
                            }
                        </div>

                    </div>
                    <div className="col-6 m-1" style={{width: '70%'}}>
                        {currentNote != undefined ? <NoteEdit idItem={currentNote} funcLoadItem={funcLoadItem} setCurrentNote={setCurrentNote} /> : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}