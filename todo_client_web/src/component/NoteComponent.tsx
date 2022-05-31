import CSS from 'csstype'
import { Note } from './class/Note';
import { saveNote as noteApi } from "../utils/Api"
import { saveItem } from '../utils/OperationItem'

export const NoteComponent = ({ note, setCurrentNote, noteAll, setAllNote}: 
    {note: Note, setCurrentNote: (f: any) => void, noteAll: Array<Note>, setAllNote: (f: Array<Note>) => void}) => {

    const style: CSS.Properties = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minHeight: '40px', 
        display: 'inline-grid'
    }

    function chnageCheckBox(value: any) {
        note.pined = !note.pined
        let allTaskTmp = noteAll.filter(t => t.id != note.id)
        allTaskTmp.push(note)

        saveItem(note, (id: any) => { }, noteApi, () => {
            setAllNote(allTaskTmp)
        })
    }


    return (
        <>
            <div onClick={() => {setCurrentNote(note.id)}} 
               className="btn btn-outline-secondary" style={style}>
                {note.head}
                <input className={"form-check-input"} type="checkbox" checked={note.pined} onChange={chnageCheckBox}></input>
            </div>
        </>
    )
};