class NoteClass {

    constructor(title, id) {
        this.title = title
        this.todos = []
        this.notes = ''
        this.id = id
        this.timeCreated = new Date().getTime()
        this.timeLastEdited = this.timeCreated
        this.numOfTodosCreated = 0
    }
}

export default NoteClass