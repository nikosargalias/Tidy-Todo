"use strict"
const {renderList, createNewElementForList, saveListToListDatabase} = UIManager();

const {createButton, renderDeleteButton, addCheckboxesToListElements, createInputElement} = createAndRenderDomElements()

const {createListCallback, editListsCallback} = eventListenerCallbacks();

const {createNewList, deleteList} = noteManager();

const publicEls = {
    createNewListForm: document.querySelector('#createNewList'),
    editButtonsContainer: document.querySelector('#editButtonsContainer'),
    editListsButton: document.querySelector('#editLists'),
    listContainer: document.querySelector('#listLinks'),
    listElements: document.querySelector('#listLinks').children,
    listElementsCheckboxes: []
};

(function eventListeners () {
    publicEls.createNewListForm.addEventListener('submit', createListCallback)
    publicEls.editListsButton.addEventListener('click', editListsCallback)
})();

// immediately render existing notes upon page load
function renderNotes(notes, domPosition) {
    domPosition.innerHTML = ''
    notes.forEach((list) => {
        const listElement = createNewElementForList(list)
        renderList(listElement, domPosition)
    })
}

renderNotes(lists, publicEls.listContainer);

function eventListenerCallbacks () {

    function editListsCallback (e) {
        e.preventDefault()
        addCheckboxesToListElements(publicEls.listElements)

        //creating, appending and event listener for delete button
        const deleteButton = createButton({className: 'button', idName: 'deleteListButton', textContent: 'Delete Selected'})
        deleteButton.addEventListener('click', deleteButtonCallback)
        renderDeleteButton(deleteButton, publicEls.editButtonsContainer)
    }


    function deleteButtonCallback(e) {
        e.preventDefault()

        publicEls.listElementsCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const listID = checkbox.id.slice(8)
                deleteList(listID)
            };
        })

        renderNotes(lists, document.querySelector('#listLinks'));
        document.querySelector('#deleteListButton').remove();
    }

    function createListCallback(e) {
        e.preventDefault()
        const listTitle = e.target.elements.noteTitle.value;
        const newList = createNewList(listTitle);
        const newListDomElement = createNewElementForList(newList);
        renderList(newListDomElement, publicEls.listContainer);
    }

    return {
        createListCallback,
        editListsCallback
    }
}





function createAndRenderDomElements() {

    function renderDeleteButton(deleteButton, domPositionToAppend){
        domPositionToAppend.append(deleteButton)
    }
    
    function createButton({className, idName, textContent} = {}) {
        try {
            document.querySelector(`#${idName}`).remove()
        } finally {
            const div = document.createElement('div')
            div.innerHTML = `<button class="${className}" id="${idName}"> ${textContent} </button>`
            const button = div.children[0]
            return button
        }
    }

    function createInputElement({type, className, idName, textContent} = {}) {
        const div = document.createElement('div')
        div.innerHTML = `<
            <input type="${type}" class="${className}" id="${idName}">
        >`
        return div.children[0]
    }

    function addCheckboxesToListElements(listElements) {
        for(let i = 0; i < listElements.length; i++) {
            try {
                document.querySelector(`#checkbox${listElements[i].id}`).remove();
            } catch (e){
            
            } finally {
                const checkbox = createInputElement({type: 'checkbox', className: 'checkbox listCheckbox', idName: `checkbox${listElements[i].id}`})
                listElements[i].append(checkbox)
            }
        }

        publicEls.listElementsCheckboxes = document.querySelectorAll('.listCheckbox')
    }

    return {
        renderDeleteButton,
        createButton,
        addCheckboxesToListElements,
        createInputElement
    }
}
























/**************
// function eventListener({action, element, callback} = {}) {
//     element.addEventListener(action, callback)
// }
 */