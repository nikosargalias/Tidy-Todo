class NoteListLogic {

    constructor(title, id) {
        this.title = title
        this.todos = []
        this.notes = ''
        this.id = id
        this.timeCreated = new Date().getTime()
        this.timeLastEdited = this.timeCreated
    }

    // addTodo(todo) {
    //     this.todos.push(todo.trim())
    // }
}