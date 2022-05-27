import React, { useState, useEffect } from "react"
import { saveNote, note as noteApi } from "../utils/Api"
import { note } from "../utils/ScreenNames"
import { deleteItem, saveItem } from "../utils/OperationItem"
import { NOTE } from "../utils/Storage"
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorView } from '../component/ErrorView'

class NoteClass {
    constructor(head = '', body = '', id = -1) {
        this.id = id;
        this.head = head;
        this.body = body;
    }
}

function getItemCurrent(id, stor, defualt) {
    const item = localStorage.getItem(stor)
    return id == '-1' ? defualt : JSON.parse(item).filter(n => n.id == id)[0]
}

export const NoteEdit = ({idItem, funcLoadItem, setCurrentNote}) => {

    const [note, setNote] = useState(getItemCurrent(idItem, NOTE, new NoteClass()))

    const [errors, setErrors] = React.useState({})

    useEffect(() => {
        if (idItem != note.id) setNote(getItemCurrent(idItem, NOTE, new NoteClass()))
    })


    function elementInput(value, setValue, name) {
        return (
            <div className="mb-3">
                <label className="form-label">{name}</label>
                <textarea type="text" className="form-control"
                    value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        )
    }


    return (
        <div>
            <h1>Note edit {idItem}</h1>

            <div className="col-md-6">
                <ErrorView text={errors.text} enable={errors.enable} />
                {elementInput(note.head, (head) => { setNote({ ...note, head }) }, 'Загаловок')}
                {elementInput(note.body, (body) => { setNote({ ...note, body }) }, 'Текст')}
            </div>

            <button className="btn btn-secondary mb-3 customButtons" onClick={() => {
                saveItem(note, (id) => setNote({ ...note, id }), saveNote, funcLoadItem)
            }}>Сохранить</button>
            <button className="btn btn-danger mb-3 customButtons" onClick={() => {
                deleteItem(note.id, noteApi, () => {
                    setCurrentNote(undefined) 
                    funcLoadItem() 
                })
            }}>Удалить</button>
        </div>
    )
}
