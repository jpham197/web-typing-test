let localPhrases = originalPhrases;
let userInput = document.getElementsByClassName("user-input")[0];
let viewPhrase = document.getElementsByClassName("phrase")[0];
let previous = document.getElementsByClassName("previous")[0];
let total = document.getElementsByClassName("total")[0];
let startTime = null;
let IF = 0; //backspaced characters
let totalSpeed = 0;
let totalAccuracy = 0;
let phraseCount = 0;

let phrase = "";
let logs = [];

const log = (key) => {

    switch (key) {
        case "Backspace":
            phrase += "←"
            break;
        case "Enter":
            phrase += "↵";
            phrase += "\r\n";
            logs.push(phrase);
            phrase = "";
            break;
        default:
            phrase += key;
            break;
    }
}

const downloadLogs = () => {
    var file = new File(logs, "session_logs.txt", {type: "text/plain;charset=utf-8"});
    saveAs(file);
    logs = [];
}

const loadNewPhrase = () => {
    let randomIndex = Math.random() * localPhrases.length;
    let phrase = localPhrases.splice(randomIndex, 1);
    viewPhrase.innerHTML = phrase;
}

const calcAccuracy = (userInput) => {
    let INF = 0;
    let C = 0;
    for (let i = 0; i < userInput.innerHTML.length; i++) {
        if (userInput.innerHTML[i] !== viewPhrase.innerHTML[i]) {
            INF++;
        } else {
            C++;
        }
    }
    const errorRate = (INF + IF) / (INF + IF + C);
    const totalErrorRate = Math.floor(errorRate * 1000) / 10;
    const accuracy = 100 - totalErrorRate;
    return accuracy;
}

const calcSpeed = (totalSeconds, userInput) => {
    const wordsTyped = userInput.innerHTML.length - 1;
    const speed = (wordsTyped / totalSeconds) * 60 * (1 / 5);
    return Math.floor(speed);
}

const submitInput = (startTime, userInput) => {
    const endTime = new Date();

    //total time in minutes
    const totalSeconds = ((endTime.getTime() - startTime.getTime()) / 1000);

    const wpm = calcSpeed(totalSeconds, userInput);
    const aer = calcAccuracy(userInput);

    totalSpeed *= phraseCount;
    totalAccuracy *= phraseCount;
    
    totalSpeed += wpm;
    totalAccuracy += aer;

    phraseCount++;
    
    totalSpeed /= phraseCount;
    totalAccuracy /= phraseCount;

    previous.innerHTML = `Sentence: ${Math.floor(wpm)} wpm, ${Math.floor(aer)}% accuracy`;
    total.innerHTML = `Lesson: ${Math.floor(totalSpeed)} wpm, ${Math.floor(totalAccuracy)}% accuracy`;
}

loadNewPhrase();

window.addEventListener("keydown", (event) => {
    //Start timer
    if (userInput.innerHTML.length == 0) {
        startTime = new Date();
    }
    log(event.key);
    switch (event.key) {
        case "Enter":
            if (userInput.innerHTML.length == viewPhrase.innerHTML.length) {
                submitInput(startTime, userInput);
                loadNewPhrase();
                userInput.innerHTML = "";
                IF = 0;
            }
            break;
        case "Escape":
            userInput.innerHTML = "";
            break;
        case "Backspace":
            userInput.innerHTML = userInput.innerHTML.slice(0, -1);
            IF++;
            break;
        case "Shift":
            break;
        case "CapsLock":
            break;
        case "Control":
            break;
        case "Alt":
            break;
        case "Meta":
            break;
        case "$":
            downloadLogs();
            break;
        default:
            if (userInput.innerHTML.length < viewPhrase.innerHTML.length) {
                userInput.innerHTML += event.key;
            }
            break;
    }
});

