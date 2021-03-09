//put event listeners
//Only the controller has access to the other two files. and it's done via a factory (module) function that returns a public api. So those functions have to be called here, in order to get access to them/ 
import {lists, saveToLocalStorage, loadFromLocalStorage} from './localStorage'
import logic from './_mvc_logic.js'
import {view} from './_mvc_view.js'

console.log('hello world')


window.addEventListener('DOMContentLoaded', () => {

    const publicEls = {
        sortBy: document.querySelector('#sortBy'),
        filterLists: document.querySelector('#filterLists'),
        createNewListForm: document.querySelector('#createNewList'),
        editButtonsContainer: document.querySelector('#editButtonsContainer'),
        editListsButton: document.querySelector('#editLists'),
        listContainer: document.querySelector('#listsContainer'),
        listElements: document.querySelector('#listLinks').children,
        listElementsCheckboxes: []
    };

    const {sortByDateLastEdited, sortByTimeCreated, deleteTodoFromList, addTodoToList, createNewList, deleteList, saveListToListDatabase} = logic()
    const {renderEmptyListMessage, createEmptyListMessage, clearElement, updateLastEditedRender, replaceElement, createRemoveListConfirmation, removeElements, createListEditElements, createForm, createTodoListElement, createEditTodosShortcut, createCheckbox, createDeleteButton, createNewElementForList, renderElement, createButton, addCheckboxesToListElements, addDetailsToListElements, createElement, renderEditListElements, renderListsToDom} = view();

    renderListsToDom(lists, publicEls.listContainer)

    publicEls.sortBy.addEventListener('change', sortByEventCallback)
    publicEls.createNewListForm.addEventListener('submit', createListCallback)
    publicEls.editListsButton.addEventListener('click', beginQuickEditSequence)
    publicEls.filterLists.addEventListener('input', filterListsCallback)

    const filters = {
        filteredLists: lists,
        editOn: false
    }

    function sortByEventCallback(e) {
        const sortByOption = e.target.value
        switch(sortByOption) {
            case 'dateCreated':
                sortByTimeCreated(filters.filteredLists)
                clearAndRerenderListsContainer()
                break;
            case 'dateLastEdited':
                sortByDateLastEdited(filters.filteredLists)
                clearAndRerenderListsContainer()
                break;
        }
    }

    function filterListsCallback(e) {
        const input = e.target.value
        filters.filteredLists = lists.filter(list => list.title.includes(input))
        renderFilteredLists(filters.filteredLists)
    }

    function updateFilteredLists() {
        const input = publicEls.filterLists.value //text typed into filter input box
        filters.filteredLists = lists.filter(list => list.title.includes(input))
    }

    function renderFilteredLists(filteredLists) {
        clearElement(publicEls.listContainer)
        if (filters.editOn) {
            const quickEditElements = createQuickEditElementsForLists(filteredLists)
            renderQuickEditElements(quickEditElements)
        } else {
            renderListsToDom(filteredLists, publicEls.listContainer)
        }
    }

    function createQuickEditElementsForLists(lists) {
        if (lists.length > 0) {
            const todoEditElements = lists.map(list => createListEditElements(list))
            return todoEditElements
        }
        else {
            const epmtyListMessage = createEmptyListMessage()
            return epmtyListMessage
        }
    }
    
    function renderQuickEditElements(listElements) {
            listElements.forEach(editElement => {
                const listId = editElement.id.slice(8)
                renderElement(editElement, publicEls.listContainer);
                addEventListenersForQuickEditElements(listId)
            });
    }

    function addEventListenersForQuickEditElements(listId) {
        const detailsElem = document.querySelector(`#quickEdit${listId}`)
        .addEventListener('click', quickEditTodoCallback);
        if (document.querySelector(`#deleteList${listId}`)) {
            const deleteListButton = document.querySelector(`#deleteList${listId}`) 
            .addEventListener('click', deleteListCallback)
        }
        const addTodoForm = document.querySelector(`#addTodoForm${listId}`)
        .addEventListener('submit', addTodoEventCallback);
    }

    function addTodoEventCallback(e) {
        e.preventDefault()
        const listId = e.target.id.slice(11)
        const todoText = e.target.elements[0].value
        addTodoToList(listId, todoText)
        const elementToUpdate = document.querySelector(`#spanList${listId}`)
        updateTodosRender(listId, elementToUpdate)
        updateLastEditedMessage(listId)
    }

    function updateLastEditedMessage(listId) {
        const list = lists.find(list => list.id == listId)
        updateLastEditedRender(document.querySelector(`#lastEdited${listId}`), list.timeLastEdited)
    }

    function updateTodosRender(listId, elementToUpdate) {
        const list = filters.filteredLists.find(list => list.id === listId)
        const listElement = createListEditElements(list)
        console.log(listElement.children[0])
        listElement.children[0].setAttribute('open', 'true') //keeps details open
        removeElements(elementToUpdate.children[0])
        elementToUpdate.prepend(listElement.children[0])
        const addTodoFormInput = document.querySelector(`#addTodoForm${listId}`).children[0]
        .focus();


        addEventListenersForQuickEditElements(listId)
    }

    function createAndRenderDeleteButton(){
        const deleteButton = createButton({className: 'button', idName: 'deleteListButton', textContent: 'Delete Selected'})
        renderElement(deleteButton, publicEls.editButtonsContainer)
        deleteButton.addEventListener('click', deleteButtonCallback)
    }

    function addEventListenersForRemoveList(listId, originalButton) {
        document.querySelector(`#confirmRemoveListButton${listId}`).addEventListener('click', e => onClickRemoveList(listId))
        document.querySelector(`#cancelRemoveListButton${listId}`).addEventListener('click', e => {onClickCancelRemoveList(listId, originalButton)})
    }

    function onClickRemoveList(listId) {
        deleteList(listId)
        const listElement = document.querySelector(`#spanList${listId}`)
        .remove()
        updateFilteredLists()
        if (lists.length <= 0) {
            renderListsToDom(filters.filteredLists, publicEls.listContainer)
        }
    }

    function onClickCancelRemoveList(listId, originalButton) {
        replaceElement(document.querySelector(`#removeListConfirmation${listId}`).parentElement, originalButton)
    }

    function deleteListCallback(e) {
        const originalButton = e.target
        const listId = e.target.id.slice(10)
        const removeListConfirmationElem = createRemoveListConfirmation(e.target.id.slice(10))
        replaceElement(e.target, removeListConfirmationElem)
        addEventListenersForRemoveList(listId, originalButton)
    }

    function quickEditTodoCallback(e) {
        if (e.target.id.includes('deleteTodo')) {
            const listId = e.target.parentElement.parentElement.id.slice(9)
            const todoId = e.target.id.slice(10)
            deleteTodoFromList(listId, todoId)
            removeElements(e.target.parentElement)
            updateTodosLengthMessage(listId)
            updateLastEditedMessage(listId)
        }
    }

    function updateTodosLengthMessage(listId) {
        const list = lists.find(list => list.id === listId);
        const todosLength = list.todos.length > 0 ? `You have ${list.todos.length} Tidy Todos` : `You don't have any Tidy Todos!`;
        document.querySelector(`#todoLengthNotice${listId}`).textContent = todosLength
    }

    function deleteListIfCheckboxTicked() {
        const listCheckboxes = document.querySelectorAll('.listCheckbox')
        .forEach((checkbox) => {
            if (checkbox.checked) {
                const listID = checkbox.id.slice(8)
                deleteList(listID)
                updateFilteredLists()
            };
        })
    }

    function clearAndRerenderListsContainer() {
        clearElement(publicEls.listContainer)
        renderFilteredLists(filters.filteredLists) 

    }

    function deleteButtonCallback(e) {
        filters.editOn = false
        deleteListIfCheckboxTicked()
        removeElements(document.querySelector('#deleteListButton'), document.querySelector('#finishEditingLists'))
        clearAndRerenderListsContainer()
        const newEditButton = createButton({className: 'button', idName: 'editLists', textContent: 'Quick Edit'})
        publicEls.editButtonsContainer.append(newEditButton)
        newEditButton.addEventListener('click', beginQuickEditSequence)
    }

    function beginQuickEditSequence(e) {
        if (lists.length <= 0) {
            clearElement(publicEls.listContainer)
            renderEmptyListMessage(publicEls.listContainer)
        } else {
            filters.editOn = true
            replaceEditButton()
            clearElement(publicEls.listContainer)
            const quickEditElements = createQuickEditElementsForLists(filters.filteredLists)
            renderQuickEditElements(quickEditElements)
            createAndRenderDeleteButton()
        }
    }

    function replaceEditButton() {
        document.querySelector('#editLists').remove()
        const finishEditingButton = createButton({className: 'button', idName: 'finishEditingLists', textContent: 'Done Editing'})
        publicEls.editButtonsContainer.append(finishEditingButton)
        finishEditingButton.addEventListener('click', doneEditingButtonCallback)
    }

    function doneEditingButtonCallback(e) {
        filters.editOn = false
        clearAndRerenderListsContainer()
        removeElements(e.target, document.querySelector('#deleteListButton'));
        const newEditButton = createButton({className: 'button', idName: 'editLists', textContent: 'Quick Edit'})
        renderElement(newEditButton, publicEls.editButtonsContainer)
        newEditButton.addEventListener('click', beginQuickEditSequence)
    }

    function createListCallback(e) {
        e.preventDefault()
        const listTitle = e.target.elements.noteTitle.value;
        const newList = createNewList(listTitle);
        updateFilteredLists()
        renderFilteredLists(filters.filteredLists)
    }
    
});
