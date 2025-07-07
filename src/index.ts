interface User {
    id: number;
    name: string;
    images: {
        hard: string;
        medium: string;
        easy: string;
        reveal: string;
    }
}

const hintImage = document.getElementById('hint-img-src') as HTMLImageElement
const easyButton = document.querySelector('.hint-level1') as HTMLButtonElement;
const mediumButton = document.querySelector('.hint-level2') as HTMLButtonElement;
const hardButton = document.querySelector('.hint-level3') as HTMLButtonElement;
const revealButton = document.querySelector('.hint-reveal') as HTMLButtonElement;
const difficultyText = document.querySelector('.hint-difficulty') as HTMLDivElement;
const loadFileButton = document.querySelector('.load-files-button') as HTMLButtonElement;
const fileLoader = document.getElementById('file-loader') as HTMLInputElement;
const submissionsSelect = document.querySelector('.locations-select') as HTMLSelectElement;
const spotBy = document.querySelector('.submission-user') as HTMLDivElement;

const timerText = document.querySelector('.timer-text') as HTMLDivElement;
const startButton = document.querySelector('.timer-start') as HTMLButtonElement;
const stopButton = document.querySelector('.timer-stop') as HTMLButtonElement;
const resetButton = document.querySelector('.timer-reset') as HTMLButtonElement;

let startTime: number;
let elapsedTime: number = 0;
let timerInterval: number | undefined;
let submissions: User[] = []

let hard = ""
let medium = ""
let easy = ""
let reveal = ""

if (easyButton) {
    easyButton.addEventListener('click', () => updateHint("Easy", easy));
}
if (mediumButton) {
    mediumButton.addEventListener('click', () => updateHint("Medium", medium));
}
if (hardButton) {
    hardButton.addEventListener('click', () => updateHint("Hard", hard));
}
if (revealButton) {
    revealButton.addEventListener('click', () => updateImage(reveal));
}

function updateHint(difficulty: string, imageUrl: string) {
    updateImage(imageUrl);
    if (difficultyText) {
        difficultyText.innerHTML = difficulty;
    }
}

function updateSpotBy(spot: string) {
    if (spotBy) {
        spotBy.innerHTML = spot;
    }
    else {
        console.error("Error: Unable to find the div element with id 'spot-by'");
    }
}

function updateImage(imageName: string) {
    if(hintImage) {
        hintImage.src = imageName;
        hintImage.width = 720;
        hintImage.height = 405;
    }
    else {
        console.error("Error: Unable to find the image element with id 'hint-img-src'");
    }
}

function startTimer() {
    if (timerInterval) {
        return;
    }
    startTime = Date.now() - elapsedTime;
    timerInterval = window.setInterval(updateTimer, 100);
}

function updateTimer() {
    const now = Date.now();
    elapsedTime = now - startTime;
    timerText.textContent = formatTime(elapsedTime);
}

function stopTimer() {
    window.clearInterval(timerInterval);
    timerInterval = undefined;
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    timerText.textContent = formatTime(elapsedTime);
}

function formatTime(time: number): string {
    const date = new Date(time);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function renderSelectOptions() {
    submissionsSelect.innerHTML = '';

    submissions.forEach(user => {
        const submissionItem = document.createElement('option');
        submissionItem.textContent = user.id + " - " + user.name;
        submissionItem.dataset.id = user.id.toString();

        submissionsSelect.appendChild(submissionItem);
    });

    if(submissionsSelect.options.length > 0) {
        submissionsSelect.hidden = false;
    }
}

function handleFileLoadIndex(event: Event) {
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

            submissions = loadedUsers;

            renderSelectOptions();
            updateImages(event,1);
        } catch(error) {
            alert('Files to load file. Please make sure it is a valid JSON file of users.');
            console.error(error);
        }
    };

    reader.readAsText(file);
    input.value = '';
}

function updateImages(event: Event,selected: Number) {
    const submission = submissions.find(user => user.id === selected);
    if(submission) {
        easy = submission.images.easy;
        medium = submission.images.medium;
        hard = submission.images.hard;
        reveal = submission.images.reveal;
        updateHint("Hard", hard);
        updateSpotBy(submission.name);
    }
}

if (startButton) {
    startButton.addEventListener('click', startTimer);
}

if (stopButton) {
    stopButton.addEventListener('click', stopTimer);
}

if (resetButton) {
    resetButton.addEventListener('click', resetTimer);
}

loadFileButton.addEventListener('click', () => {
    fileLoader.click();
})

fileLoader.addEventListener('change', handleFileLoadIndex);

submissionsSelect.addEventListener('change', (e) => {
    updateImages(e,submissionsSelect.selectedIndex + 1);
});



