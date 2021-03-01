// import noteManager from './notesManagerForUI'


function UIManager() {

    return {
        renderList,
        createNewElementForList,
        saveListToListDatabase
    }
    
    function renderList(listElement, domPosition) {
        domPosition.append(listElement)
    }
    
    function createNewElementForList(list) {
        const div = document.createElement('div')
        div.innerHTML = `<a class="noteTitle" id="${list.id}" href='./note-edit-page.html#${list.id}'>${list.title}</a>`
        return div.children[0]
    }
    
    function saveListToListDatabase(newList) {
        lists.push(newList)
        saveToLocalStorage('lists', lists)
    }

};