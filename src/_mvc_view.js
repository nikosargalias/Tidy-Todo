//mvc architecture
//this is the module that renders everything to the dom
//the view adds event listeners + also accepts callbacks to add as event listeners - so when someone clicks on something, the logic is activated via a callback
const moment = require('moment');

function view() {

    function updateTextContent(element, textContent) {
        element.textContent = textContent
    }

    function updateLastEditedRender(element, timeLastEdited) {
        const timeSinceLastEdited = moment(timeLastEdited).fromNow()
        element.textContent = `Last edited ${timeSinceLastEdited}`
    }

    function clearElement(element) {
        element.innerHTML = ''
    };

    function renderElement(element, domPositionToAppend){
        domPositionToAppend.append(element)
    }

    function replaceElement(oldElement, newElement) {
        oldElement.replaceWith(newElement)
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

    function createElement({tag, type, className, idName, textContent, rel} = {}) {
        if (document.getElementById(`${idName}`)) {
            throw new Error('ID is already assigned to existing element')
        }
        const div = document.createElement('div')
        div.innerHTML = `<
            <${tag} type="${type}" class="${className}" rel="${rel}" id="${idName}">${textContent}</${tag ? tag : ''}>
        >`
        return div.children[0]
    }

    function renderListsToDom(lists, domRenderElement) {
        console.log(lists.length)
        if (lists.length > 0) {
            domRenderElement.innerHTML = ''
            const listElements = lists.map(list => createNewElementForList(list))
            .forEach(list => {
                renderElement(list, domRenderElement)
            })
        }
        else {
            renderEmptyListMessage(domRenderElement)
        }
    };

    function renderEmptyListMessage(domRenderElement) {
        const emptyListMessage = document.createElement('p');
        emptyListMessage.textContent = 'No Tidy Tody Lists To Show!';
        emptyListMessage.classList.add('empty-message');
        domRenderElement.append(emptyListMessage)
    }

    function removeElements(...element) {
        element.forEach(elem => {
            elem.remove()
        })
    }
    
    function createNewElementForList(list) {
        const div = document.createElement('div')
        div.innerHTML = `<span class="list-item" id="${list.id}">
                            <a class="listTitle list-item__title" id="${list.id}" href='./note-edit-page.html#${list.id}'>${list.title}</a>
                            <p class="list-item__subtitle">Last edited ${moment(list.timeLastEdited).fromNow()}</p>
                        </span>`

        return div.children[0]
    }

    function createEmptyListMessage() {
        const p = document.createElement('p')
        p.textContent = 'No Tidy Tody Lists To Edit!'
        p.classList.add('empty-message')
        return p
    }


    function createListEditElements(list) {
        const todosLength = list.todos.length > 0 ? `You have ${list.todos.length} Tidy Todos` : `You don't have any Tidy Todos!`;
        let div = document.createElement('div')
        div.innerHTML = `
            <span id="spanList${list.id}" class="actions list-item"> 
                <details id="quickEdit${list.id}" name="listDetails" class="actions__container">
                    <summary class="actions list-item__title">${list.title} - Quick Edit</summary>
                    <p class="empty-message" id="todoLengthNotice${list.id}">${todosLength}</p>
                    <form id="addTodoForm${list.id}" class="form">
                        <input class="input" required>
                        <button class="button">Add Todo</button>
                    </form>
                </details>
                <input type="checkbox" class="listCheckbox checkbox" id="checkbox${list.id}">
                <button id="deleteList${list.id}" class="small_button small_button_text">Remove List</button>
                <p class="list-item__subtitle" id="lastEdited${list.id}">Last edited ${moment(list.timeLastEdited).fromNow()}</p>
            </span>`
        list.todos.forEach(todo => {
            div.children[0].children[0].innerHTML += `
                <div class="list-item">
                    <span value="${todo.text}" class="list-item__title">${todo.text}</span>
                    <button id="deleteTodo${todo.id}" class="small_button small_button_text">Remove Todo</button>
                </div>`
        })
        return div.children[0]
    }

    function createTodoElements(list) {
        const todoElements = list.todos.map(todo => {
            return {html:`
                <div class="list-item_2" id="todoList${todo.id}">
                    <span class="list-item__container_2">
                        <input id="checkbox_${todo.id}" class="checkbox" type="checkbox">
                        <p id="editTodo_${todo.id}" class="list-item__title" contenteditable="true">${todo.text} 
                        </p>
                    </span>
                    <button id="deleteTodo${todo.id}" class="small_button small_button_text">Remove Todo</button>
                </div>
                `, id: todo.id, isCompleted: todo.isCompleted}
        })
        return todoElements
    }

    function createTodoListElement(todo, listId, todoList, id) {
        try {
            document.getElementById(`todoList${listId}`).remove()
        } catch {

        } finally {
            const div = document.createElement('div')
            div.innerHTML = `<ul id="todoList${listId}"></ul>`
            div.children[0].innerHTML += `<li id="todo_${todo.id}">${todo.text}</li>`
            return div.children[0]
        }
    }


    function createForm(list) {
        const div = document.createElement('div')
        div.innerHTML = `<form id="quickEditForm_${list.id}" class="actions">
                            <input name="todo_${list.id}" placeholder="Todo Text" class="input" required>
                            <button class="button">Add Todo</button>
                        </form>
                            `
        return div.children[0]
    }

    function createRemoveListConfirmation(listId) {
        const div = document.createElement('div')
        div.innerHTML = `
            <div id="removeListConfirmation${listId}">
                <p class="simple-message">Are you sure you want to remove this list?</p>
                <button id="confirmRemoveListButton${listId}" class="button">Yes</button>
                <button id="cancelRemoveListButton${listId}" class="button">No</button>
            </div>`
        return div
    }

    function renderTodosLengthMessage(list, domElement) {
        const todosLength = list.todos.length > 0 ? `You have ${list.todos.length} Tidy Todos` : `You don't have any Tidy Todos!`;
        domElement.textContent = todosLength
    }

    return {
        createNewElementForList,
        renderElement,
        createButton,
        createElement,
        createTodoListElement,
        createForm,
        renderListsToDom,
        removeElements,
        createListEditElements,
        updateTextContent,
        updateLastEditedRender,
        createTodoElements,
        clearElement,
        replaceElement,
        createRemoveListConfirmation,
        createEmptyListMessage,
        renderEmptyListMessage,
        renderTodosLengthMessage


    }
}

export {view}