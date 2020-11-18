let localPhrases = originalPhrases;
let userInput = document.getElementsByClassName("user-input")[0];
let viewPhrase = document.getElementsByClassName("phrase")[0];
let speedView = document.getElementsByClassName("speed")[0];
let accuracyView = document.getElementsByClassName("accuracy")[0];
let startTime = null;

const loadNewPhrase = () => {
    let randomIndex = Math.random() * localPhrases.length;
    let phrase = localPhrases.splice(randomIndex, 1);
    viewPhrase.innerHTML = phrase;
}

const calcAccuracy = () => {

}

const calcSpeed = () => {
    
}

const submitInput = (startTime, userInput) => {
    console.log(startTime)
    const endTime = new Date();
    const totalTime = ((endTime.getTime() - startTime.getTime()) / 1000) / 60; //total time in minutes
    const wordsTyped = userInput.innerHTML.split(" ").length;
    const speed = wordsTyped / totalTime;
    speedView.innerHTML = `Speed: ${Math.floor(speed)} wpm`;
    console.log(speed);
    return totalTime;
}

loadNewPhrase();

window.addEventListener("keydown", (event) => {
    //Start timer
    if (userInput.innerHTML.length == 0) {
        startTime = new Date();
    }
    switch (event.key) {
        case "Enter":
            if (userInput.innerHTML.length == viewPhrase.innerHTML.length) {
                submitInput(startTime, userInput);
                loadNewPhrase();
                userInput.innerHTML = "";
            }
            break;
        case "Escape":
            userInput.innerHTML = "";
            break;
        case "Backspace":
            userInput.innerHTML = userInput.innerHTML.slice(0, -1);
            break;
        case "Shift":
            break;
        case "CapsLock":
            break;
        case "Control":
            break;
        case "Alt":
            break;
        default:
            if (userInput.innerHTML.length < viewPhrase.innerHTML.length) {
                userInput.innerHTML += event.key;
            }
            break;
    }
});

