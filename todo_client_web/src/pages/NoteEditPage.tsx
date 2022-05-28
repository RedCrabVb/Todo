import React, { useState, useEffect, Dispatch, SetStateAction } from "react"
import { saveNote, note as noteApi } from "../utils/Api"
import { deleteItem, saveItem } from "../utils/OperationItem"
import { NOTE } from "../utils/Storage"
import { Note } from "../component/class/Note"
import { Item } from '../component/class/Item'


function getItemCurrent<P extends  Item>(id: number, stor: string, defualt: P) {
    const item: string = localStorage.getItem(stor) || '{}'
    return id == -1 ? defualt : JSON.parse(item).filter((n: P) => n.id == id)[0]
}

export const NoteEdit = ({idItem, funcLoadItem, setCurrentNote}: {idItem: number, funcLoadItem: () => void, setCurrentNote: Dispatch<SetStateAction<number | undefined>>}) => {

    const [note, setNote] = useState(getItemCurrent(idItem, NOTE, new Note()))


    useEffect(() => {
        if (idItem != note.id) setNote(getItemCurrent(idItem, NOTE, new Note()))
    })


    function elementInput(value: string, setValue: (f: string) => void, name: string) {
        return (
            <div className="mb-3">
                <label className="form-label">{name}</label>
                <textarea className="form-control"
                    value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        )
    }


    return (
        <div>
            <h1>Note edit {idItem}</h1>

            <div className="col-md-6">
                {/* <ErrorView text={errors.text} enable={errors.enable} /> */}
                {elementInput(note.head, (head) => { setNote({ ...note, head }) }, 'Загаловок')}
                {elementInput(note.body, (body) => { setNote({ ...note, body }) }, 'Текст')}
            </div>

            <button className="btn btn-secondary mb-3 customButtons" onClick={() => {
                saveItem(note, (id: number) => setNote({ ...note, id }), saveNote, funcLoadItem)
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
