const nameInput = document.getElementById("name");
const addNameButton = document.getElementById("addNameButton");
const clearAllButton = document.getElementById("clearDataButton");
const namesList = document.getElementById("namesList");
const fetchingStatus = document.getElementById("fetchingStatus");

let list = [];
let isFetching = false;
fetchUsers()
    .then(() => {
        console.log("Rendering list:", list);
        renderNamesList()
    });

function updateFetchStatus(fetchingBool) {
    isFetching = fetchingBool;
    if (isFetching) {
        fetchingStatus.innerHTML = "Fetching...";
    } else {
        fetchingStatus.innerHTML = "";
    }
}


async function fetchUsers() {
    updateFetchStatus(true);
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            updateFetchStatus(false);
            return response.json();
        })
        .then(json => {
            updateFetchStatus(false);
            list = json
        })
        .catch((err) => {
            updateFetchStatus(false);
            console.log(err);
        });
}

function removeFromList(listItem) {
    fetch(`https://jsonplaceholder.typicode.com/users/${listItem.id}`, {method: "DELETE"})
        .then(response => {
            if (response.ok) {
                list = list.filter(item => item !== listItem);
                renderNamesList();
            } else {
                console.log(`Failed to delete ${listItem.id}`)
            }
        })
        .catch((err) => console.log(err));
}


function addName() {
    const value = nameInput.value;
    if (!list.includes(value) && value !== "") {
        list.push(value);
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
            spanElement.innerHTML = listItem.username;
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
    renderNamesList();
});