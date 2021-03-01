function noteManager() {
    
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


    return {
        createNewList: createNewLists,
        deleteList
    }

}

        
    

// export default noteManager