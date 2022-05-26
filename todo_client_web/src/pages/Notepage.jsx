class Note {
    constructor(head = '', body = '', id = -1) {
        this.id = id;
        this.head = head;
        this.body = body;
    }
}

export const Note = () => {
    let note = (params.route.params || {note: undefined}).note || new Note()

    const [id, setId] = useState(note.id)
    const [head, setHead] = useState(note.head)
    const [body, setBody] = useState(note.body)

    const [errors, setErrors] = React.useState({})


    return (
        <div></div>
    )
}