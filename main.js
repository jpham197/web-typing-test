let localPhrases = originalPhrases;
let userInput = document.getElementsByClassName("user-input")[0];
let viewPhrase = document.getElementsByClassName("phrase")[0];
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
    const totalTime = endTime.getTime() - startTime.getTime();
    console.log(totalTime)
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
            submitInput(startTime, userInput);
            loadNewPhrase();
            userInput.innerHTML = "";
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
        default:
            userInput.innerHTML += event.key;
            break;
    }
});

