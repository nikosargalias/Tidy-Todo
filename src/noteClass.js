class NoteListLogic {

    constructor(title, id) {
        this.title = title
        this.todos = []
        this.notes = ''
        this.id = id
        this.timeCreated = new Date().getTime()
        this.timeLastEdited = this.timeCreated
    }
}

export default NoteListLogic