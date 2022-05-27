import React, { useState } from "react"
import { saveNote, note as noteApi } from "../utils/Api"
import { note } from "../utils/ScreenNames"
import { deleteItem, saveItem } from "../utils/OperationItem"
import { NOTE } from "../utils/Storage"
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorView } from '../component/ErrorView'
import { Header } from '../pages/Header'

class NoteClass {
    constructor(head = '', body = '', id = -1) {
        this.id = id;
        this.head = head;
        this.body = body;
    }
}

function getItemCurrent(id, stor, defualt) {
    const item = localStorage.getItem(stor)
    console.log(`${stor} save ${item}`)
    return id == '-1' ? defualt : JSON.parse(item).filter(n => n.id == id)[0]
}

export const NoteEdit = (p) => {
    const idNote = useParams()['*']
    const navigate = useNavigate()


    let note = getItemCurrent(idNote, NOTE, new NoteClass())

    const [id, setId] = useState(note.id)
    const [head, setHead] = useState(note.head)
    const [body, setBody] = useState(note.body)

    const [errors, setErrors] = React.useState({})

    return (
        <div>
            <Header />
            <h1>Note edit {id}</h1>

            <div className="col-md-6">
                <ErrorView text={errors.text} enable={errors.enable} />
                <div className="mb-3">
                    <label className="form-label">Почта</label>
                    <input type="text" className="form-control" id="username"
                        value={head} onChange={(e) => setHead(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <textarea type="text" className="form-control" id="password"
                        value={body} onChange={(e) => setBody(e.target.value)} />
                </div>

            </div>

            <button onClick={() => { saveItem(new NoteClass(head, body, id), setId, saveNote) }}>Сохранить</button>
            <button bcolor={'#d41b1b'} onClick={() => deleteItem(id, navigate, note, noteApi)}>Удалить</button>
        </div>
    )
}
