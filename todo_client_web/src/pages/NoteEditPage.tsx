import React, { useState, useEffect, Dispatch, SetStateAction } from "react"
import { saveNote, note as noteApi } from "../utils/Api"
import { deleteItem, saveItem } from "../utils/OperationItem"
import { NOTE } from "../utils/Storage"
import { Note } from "../component/class/Note"
import { Item } from '../component/class/Item'
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

function getItemCurrent<P extends Item>(id: number, stor: string, defualt: P) {
    const item: string = localStorage.getItem(stor) || '{}'
    return id == -1 ? defualt : JSON.parse(item).filter((n: P) => n.id == id)[0]
}

export const NoteEdit = ({ idItem, funcLoadItem, setCurrentNote }: { idItem: number, funcLoadItem: () => void, setCurrentNote: Dispatch<SetStateAction<number | undefined>> }) => {

    const [note, setNote] = useState(getItemCurrent(idItem, NOTE, new Note()))
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    )
    const [passwordNote, setPasswordNote] = useState('')
    const [showEncryptedNote, setShowEncryptedNote] = useState(false)

    function functionSetStateEditor(editorStateL: EditorState) {
        let body: string = draftToHtml(convertToRaw(editorStateL.getCurrentContent()))
        setNote({ ...note, body })
        setEditorState(editorStateL)
    }

    useEffect(() => {
        if (idItem != note.id) {
            setShowEncryptedNote(false)
            const item = getItemCurrent(idItem, NOTE, new Note())
            setNote(item)
            const { contentBlocks, entityMap } = htmlToDraft(item.body);
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setEditorState(EditorState.createWithContent(contentState))
        }
    })


    function elementInput(value: string, setValue: (f: string) => void, name: string) {
        return (
            <div className="mb-3">
                <label className="form-label">{name}</label>
                <input type="text" className="form-control"
                    value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        )
    }

    function encryptedString(str: string) {
        // var text = "My Secret text";
        // var encText = AES.encrypt(text, 'pass').toString()
        // var decText = AES.decrypt(encText, 'pass').toString(CryptoJS.enc.Utf8)
        // console.log({encText}, {decText})

        if (note.encrypted) {
            return AES.encrypt(str, passwordNote).toString();
        } else {
            return str;
        }
    }

    function decryptString(str: string) {
        if (note.encrypted) {
            return  AES.decrypt(str, passwordNote).toString(CryptoJS.enc.Utf8);
        } else {
            return str;
        }
    }

    function decryptNote() {
        let newNote = { ...note,  body: decryptString(note.body)}
        setNote(newNote)
        const { contentBlocks, entityMap } = htmlToDraft(newNote.body);
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        setEditorState(EditorState.createWithContent(contentState))
    }

    return (
        <>
            {!showEncryptedNote && note.encrypted ? <>
                {elementInput(passwordNote, setPasswordNote, 'Пароль для расшифровки')}
                <button className="btn btn-info" onClick={() => { setShowEncryptedNote(true); decryptNote() }}>Подтвердить</button>
            </> : <>
                <div className="col-md">
                    {elementInput(note.head, (head) => { setNote({ ...note, head }) }, 'Загаловок')}
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={functionSetStateEditor}
                    />

                    <div>
                        <p>Шифровать заметку? {note.encrypted ? "Да" : "Нет"}</p>
                        <input className={"form-check-input"} type="checkbox" checked={note.encrypted} onChange={(encrypted) => setNote({ ...note, encrypted: !note.encrypted })}></input>
                    </div>
                </div>

                <button className="btn btn-secondary mb-3 customButtons" onClick={() => {
                    let newNote = { ...note,  body: encryptedString(note.body)}
                    setNote(newNote)
                    saveItem(newNote, (id: number) => setNote({ ...note, id }), saveNote, funcLoadItem)
                }}>Сохранить</button>
                <button className="btn btn-danger mb-3 customButtons" onClick={() => {
                    deleteItem(note.id, noteApi, () => {
                        setCurrentNote(undefined)
                        funcLoadItem()
                    })
                }}>Удалить</button>
            </>}


        </>
    )
}

