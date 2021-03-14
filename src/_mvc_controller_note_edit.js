import logic from './_mvc_logic.js'
import {view} from './_mvc_view.js'
import {lists} from './localStorage';

window.addEventListener('DOMContentLoaded', () => { 
        
    const publicEls = {
        pageTitle: document.querySelector('#todoListName'),
        listTextArea: document.querySelector('#listTextArea'),
        addTodoForm: document.querySelector('#addTodoForm'),
        todosList: document.querySelector('#listContainer'),
        lastUpdatedNotice: document.querySelector('#updatedAtNotice'),
        deleteListButton: document.querySelector('#deleteList'),
        todosLengthMessage: document.querySelector('#todoLengthMessage')
    }

    const {updateIsCompleted, updateListTitle, updateTodoText, updateListNotes, deleteTodoFromList, addTodoToList, deleteList} = logic()
    const {renderTodosLengthMessage, createRemoveListConfirmation, replaceElement, clearElement, createTodoElements, updateLastEditedRender, updateTextContent, removeElements} = view();

    const targetListId = location.hash.substring(1)
    const list = lists.find((list) => list.id === targetListId);

    updateTextContent(publicEls.pageTitle, list.title || 'Unnamed List');
    updateTextContent(publicEls.listTextArea, list.notes);
    updateLastEditedRender(publicEls.lastUpdatedNotice, list.timeLastEdited)
    publicEls.pageTitle.addEventListener('input', updatePageTitle)
    publicEls.listTextArea.addEventListener('input', onTypeUpdateListText);
    publicEls.todosList.addEventListener('input', onTypeTodoText)
    publicEls.todosList.addEventListener('click', onDeleteTodo)
    publicEls.addTodoForm.addEventListener('submit', addTodoEventCallback)
    publicEls.deleteListButton.addEventListener('click', onClickDeleteListButton)

    function addEventListenersForRemoveList() {
        document.querySelector(`#confirmRemoveListButton${list.id}`).addEventListener('click', onClickRemoveList)
        document.querySelector(`#cancelRemoveListButton${list.id}`).addEventListener('click', onClickCancelRemoveList)
    }

    renderTodosLengthMessage(list, publicEls.todosLengthMessage)

    function onClickDeleteListButton(e) {
        // const originalButton = e.target
        const removeListConfirmation = createRemoveListConfirmation(list.id)
        replaceElement(e.target, removeListConfirmation)
        addEventListenersForRemoveList()
    }

    // eslint-disable-next-line no-unused-vars
    function onClickRemoveList(e) {
        deleteList(list.id)
        navigateHome()
    }

    // eslint-disable-next-line no-unused-vars
    function onClickCancelRemoveList(e) {
        document.querySelector(`#removeListConfirmation${list.id}`).replaceWith(publicEls.deleteListButton)
    }

    function navigateHome() {
        location.assign("./index.html")
    }

    function onTypeUpdateListText(e) {
        const textContent = e.target.value
        updateListNotes(list, textContent)
        updateLastEditedRender(publicEls.lastUpdatedNotice, list.timeLastEdited)
    }

    function updatePageTitle(e) {
        const textContent = e.target.textContent
        updateListTitle(list.id, textContent)
        updateTextContent(publicEls.pageTitle, textContent);
        updateLastEditedRender(publicEls.lastUpdatedNotice, list.timeLastEdited)
    }

    function renderTodos() {
        const todoElements = createTodoElements(list)
        console.log(todoElements)
        todoElements.forEach(todoObject => {
            publicEls.todosList.innerHTML += todoObject.html
        })
        toggleCheckboxes()
    }

    function toggleCheckboxes() {
        console.log(list)
        list.todos.forEach(todo => {
            const checkbox = document.querySelector(`#checkbox_${todo.id}`)
            checkbox.checked = todo.isCompleted
        })
    }

    function onTypeTodoText(e) {
        if (e.target.id.includes('checkbox')) {
            const isChecked = e.target.checked
            const todoId = e.target.id.slice(9)
            updateIsCompleted(list.id, todoId, isChecked)
        } else {
            const todoId = e.target.id.slice(9)
            const textContent = e.target.textContent
            updateTodoText(list.id, todoId, textContent)
        }
    }

    function onDeleteTodo(e) {
        if (e.target.id.includes('deleteTodo')) {
            const todoId = e.target.id.slice(10)
            deleteTodoFromList(targetListId, todoId)
            removeElements(document.querySelector(`#todoList${todoId}`))
            updateLastEditedRender(publicEls.lastUpdatedNotice, list.timeLastEdited)
            renderTodosLengthMessage(list, publicEls.todosLengthMessage)
        } 
    }

    function addTodoEventCallback(e) {
        e.preventDefault()
        const todoText = e.target.elements[0].value
        addTodoToList(list.id, todoText)
        clearElement(publicEls.todosList)
        e.target.elements[0].value = ''
        renderTodos()
        updateLastEditedRender(publicEls.lastUpdatedNotice, list.timeLastEdited)
        renderTodosLengthMessage(list, publicEls.todosLengthMessage)
    }

    renderTodos()
})