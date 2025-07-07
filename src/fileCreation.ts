let userIndex = 1;
let users: User[] = []
let selectedUserId: number | null = null;

const userList = document.querySelector('.file-users-list') as HTMLUListElement;
const addButton = document.querySelector('.file-interaction-add-button') as HTMLButtonElement;
const updateButton = document.querySelector('.file-interaction-update-button') as HTMLButtonElement;
const createButton = document.querySelector('.file-interaction-create-button') as HTMLButtonElement;
const loadButton = document.querySelector('.file-interaction-load-button') as HTMLButtonElement;
const fileLoaderInput = document.getElementById('file-loader') as HTMLInputElement;


const nameInput = document.getElementById('name') as HTMLInputElement;
const easyInput = document.getElementById('easy') as HTMLInputElement;
const mediumInput = document.getElementById('medium') as HTMLInputElement;
const hardInput = document.getElementById('hard') as HTMLInputElement;
const revealInput = document.getElementById('reveal') as HTMLInputElement;

updateButton.hidden = true;

function clearInputs() {
    nameInput.value = '';
    easyInput.value = '';
    mediumInput.value = '';
    hardInput.value = '';
    revealInput.value = '';
}

function renderUserList() {
    userList.innerHTML = '';

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.id + " - " + user.name;
        listItem.dataset.id = user.id.toString();

        if(user.id === selectedUserId) {
            listItem.classList.add('selected');
        }

        listItem.addEventListener('click', () => {
            selectUserForEditing(user.id);
        });

        userList.appendChild(listItem);
    })
}

function addUser() {
    const userName = nameInput.value;
    const easyImg = easyInput.value;
    const mediumImg = mediumInput.value;
    const hardImg = hardInput.value;
    const revealImg = revealInput.value;

    if(easyImg && mediumImg && hardImg && revealImg && userName.trim() !== '') {
        const newUser: User = {
            id: userIndex++,
            name: userName,
            images: {
                hard: hardImg,
                medium: mediumImg,
                easy: easyImg,
                reveal: revealImg,
            },
        };

        users.push(newUser);
        clearInputs();
        renderUserList();
    }
}

function selectUserForEditing(userId: number) {
    addButton.hidden = true;
    updateButton.hidden = false;
    selectedUserId = userId;
    const user = users.find(user => user.id === userId);

    if(user) {
        nameInput.value = user.name;
        easyInput.value = user.images.easy;
        mediumInput.value = user.images.medium;
        hardInput.value = user.images.hard;
        revealInput.value = user.images.reveal;
    }

    renderUserList();
}

function updateUser() {
    if(selectedUserId == null) {
        alert('Please select a user to update.');
        return;
    }

    const user = users.find(user => user.id === selectedUserId);
    if(user) {
        user.name = nameInput.value;
        user.images.easy = easyInput.value;
        user.images.medium = mediumInput.value;
        user.images.hard = hardInput.value;
        user.images.reveal = revealInput.value;
    }

    selectedUserId = null;
    clearInputs();
    renderUserList();
    addButton.hidden = false;
    updateButton.hidden = true;
}

function createJsonFile() {
    if(users.length === 0) {
        alert('Please add at least one user.');
        return;
    }

    const jsonString = JSON.stringify(users, null, 2);
    const blob = new Blob([jsonString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users.json';
    link.click();
    URL.revokeObjectURL(url);
}

function handleFileLoad(event: Event) {
    let input = event.target as HTMLInputElement;
    if(!input.files || input.files.length === 0){
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const text = e.target?.result;
        if(typeof text !== 'string') return;

        try {
            const loadedUsers = JSON.parse(text);
            if(!Array.isArray(loadedUsers)) {
                throw new Error('JSON file is not an array.');
            }

            users = loadedUsers;

            if(users.length > 0) {
                userIndex = Math.max(...users.map(user => user.id)) + 1;
            } else {
                userIndex = 1;
            }

            selectedUserId = null;
            clearInputs();
            renderUserList();
        } catch(error) {
            alert('Files to load file. Please make sure it is a valid JSON file of users.');
            console.error(error);
        }
    };

    reader.readAsText(file);
    input.value = '';
}

if(addButton) {
    addButton.addEventListener('click', addUser);
}

if(updateButton) {
    updateButton.addEventListener('click', updateUser);
}

if(createButton) {
    createButton.addEventListener('click', createJsonFile);
}

loadButton.addEventListener('click', () => {
    fileLoaderInput.click();
})

fileLoaderInput.addEventListener('change', handleFileLoad);
