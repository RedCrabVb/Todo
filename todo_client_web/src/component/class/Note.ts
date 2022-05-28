export class Note {
    id: number
    head: string
    body: string

    constructor(head = '', body = '', id = -1) {
        this.id = id
        this.head = head
        this.body = body
    }
}