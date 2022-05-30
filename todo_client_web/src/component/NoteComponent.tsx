import CSS from 'csstype'
import { Note } from './class/Note';

export const NoteComponent = ({ note, setCurrentNote}: {note: Note, setCurrentNote: (f: any) => void}) => {

    const style: CSS.Properties = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minHeight: '40px', 
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