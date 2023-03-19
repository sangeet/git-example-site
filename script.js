const nameInput = document.getElementById("name");
const addNameButton = document.getElementById("addNameButton");
const clearAllButton = document.getElementById("clearDataButton");
const namesList = document.getElementById("namesList");

let list = [];
fetchListFromStorage();
renderNamesList();

function removeFromList(listItem) {
    list = list.filter(item => item !== listItem);
    addListToStorage();
    renderNamesList();
}

function clearListFromStorage() {
    list = [];
    localStorage.removeItem("list");
    renderNamesList();
}

function addListToStorage() {
    localStorage.setItem("list", JSON.stringify(list));
}

function fetchListFromStorage() {
    const listString = localStorage.getItem("list");
    console.log(listString);
    if (listString !== null) {
        list = JSON.parse(listString);
    }
}

function addName() {
    const value = nameInput.value;
    if (!list.includes(value) && value !== "") {
        list.push(value);
        addListToStorage();
        nameInput.value = "";
    }
    renderNamesList();
}

function renderNamesList() {
    namesList.innerHTML = "";
    if (list !== null) {
        list.forEach(listItem => {
            const listElement = document.createElement('li')

            const spanElement = document.createElement('span');
            spanElement.innerHTML = listItem;
            listElement.appendChild(spanElement);

            const buttonElement = document.createElement('button');
            buttonElement.innerHTML = 'X';
            buttonElement.addEventListener('click', () => removeFromList(listItem))
            listElement.appendChild(buttonElement);

            namesList.appendChild(listElement);
        })
    }
}

addNameButton.addEventListener('click', addName);
clearAllButton.addEventListener('click', () => {
    clearListFromStorage();
    renderNamesList();
});