const lists = loadFromLocalStorage('lists')

function saveToLocalStorage(key, value) {
    const stringify = JSON.stringify(value)
    localStorage.setItem(key, stringify)
}

function loadFromLocalStorage(key) {
    const localStorageData = localStorage.getItem(key)
    const parsedData = JSON.parse(localStorageData)

    try {
        return parsedData || []
    }
    catch (e) {
        return []
    } 
}


// localStorage.clear()