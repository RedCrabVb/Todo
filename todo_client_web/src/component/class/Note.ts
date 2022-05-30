export class Note {
    id: number
    head: string
    body: string
    pined: boolean

    constructor(head = '', body = '', pined = false, id = -1) {
        this.id = id
        this.head = head
        this.body = body
        this.pined = false
    }
}