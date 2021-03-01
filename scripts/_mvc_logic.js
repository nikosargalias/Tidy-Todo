//functions for how to change the data, and resend everything to the view.js to re-render everything

// const controller = new eventCallbacks(renderNotes)

function logic() {
    
    function createNewLists(title, id) {
        const newList = new NoteListLogic(title, uuidv4())
        saveListToListDatabase(newList)
        return newList
    }

    function deleteList(id) {
        const index = lists.findIndex(list => list.id === id)
        lists.splice(index, 1)
        saveToLocalStorage('lists', lists)
    }

    function saveListToListDatabase(newList) {
        lists.push(newList)
        saveToLocalStorage('lists', lists)
    }

    function addTodoToList(id, textContent) {
        const list = lists.find(list => list.id === id)

        list.todos.push({
            id: list.todos.length,
            text: textContent,
            isCompleted: false
        })
        updateLastEdited(list)
        saveToLocalStorage('lists', lists)
    }

    function deleteTodoFromList(listId, todoId) {
        const list = lists.find(list => listId === list.id)
        const todoIndex = list.todos.findIndex(todo => todoId == todo.id)
        list.todos.splice(todoIndex, 1)
        updateLastEdited(list)
        saveToLocalStorage('lists', lists)
    }


    function sortByTimeCreated(filteredLists) {
        filteredLists.sort((a, b) => {
            return b.timeCreated < a.timeCreated ? -1 : 1
        })
    }

    function sortByDateLastEdited(filteredLists) {
        filteredLists.sort((a, b) => {
            return b.timeLastEdited < a.timeLastEdited ? -1 : 1
        })
    }

    function updateListNotes(list, textContent) {
        list.notes = textContent
        updateLastEdited(list)
        saveToLocalStorage('lists', lists)
    }

    function updateLastEdited(list) {
        list.timeLastEdited = moment()
    }

    function updateTodoText(listId, todoId, textContent) {
        const list = lists.find(list => list.id == listId)
        const todo = list.todos.find(todo => todo.id == todoId)
        todo.text = textContent
        updateLastEdited(list)
        saveToLocalStorage('lists', lists)
    }

    function updateListTitle(listId, textContent) {
        const list = lists.find(list => list.id == listId) 
        list.title = textContent
        updateLastEdited(list)
        saveToLocalStorage('lists', lists)
    }

    function updateIsCompleted(listId, todoId, isChecked) {
        const list = lists.find(list => list.id == listId)
        const todo = list.todos.find(todo => todo.id == todoId)
        todo.isCompleted = isChecked
        updateLastEdited(list)
        saveToLocalStorage('lists', lists)
    };

    // function getTimeSiceLastUpdated(list) {
    //     return moment(list.timeLastEdited).fromNow()
    // }



    return {
        createNewList: createNewLists,
        deleteList,
        addTodoToList,
        saveListToListDatabase,
        deleteTodoFromList, 
        sortByDateLastEdited, 
        sortByTimeCreated,
        updateListNotes,
        updateTodoText,
        updateListTitle,
        updateIsCompleted,
        // getTimeSiceLastUpdated
    }

}


export default logic

