let wins = 0,
    loses = 0,
    choices = 9,
    secLetter = setLetter(),
    letterHistory = [];

const domSide = {
    playerWins: document.querySelector(".playerWins"),
    playerLoses: document.querySelector(".playerLoses"),
    playerChoice: document.querySelector(".playerChoice"),
    playerHistory: document.querySelector(".playerLetterHistory"),
    compSecretLetter: document.querySelector(".compSecretLetter"),
    playerSelectedLetter: document.querySelector(".playerSelectedLetter"),

    updateWins(score) {
        this.playerWins.innerHTML = score;
    },
    updateLoses(score) {
        this.playerLoses.innerHTML = score;
    },
    updateChoice(choice) {
        this.playerChoice.innerHTML = choice;
    },
    updateHistory(historyArr) {
        this.playerHistory.innerHTML = historyArr.join(" ").toUpperCase();
    },
    printSecretLetter(letter) {
        this.compSecretLetter.innerHTML = letter;
    },
    printPlayerLetter(letter) {
        this.playerSelectedLetter.innerHTML = letter;
    }
}

const check = (player) => {
    if (letterEdgeCase(player)) {
        if (!(historyEdgeCase(player))) {
            letterHistory.push(player);
            domSide.updateHistory(letterHistory);
            domSide.printPlayerLetter(player.toUpperCase());
            
            if (player === secLetter) {
                wins++;
                domSide.updateWins(wins);
                domSide.printSecretLetter(secLetter.toUpperCase());
                return reset();
            } else {
                choices--;
                domSide.updateChoice(choices);
                if (choices === 0) {
                    loses++;
                    domSide.updateLoses(loses);
                    domSide.printSecretLetter(secLetter.toUpperCase());
                    return reset();
                }
            }
        } else {
            let alertBox = document.querySelector(".already-used-letter");
            alertBox.innerHTML = `${player.toUpperCase()} has already been used.`;
            alertBox.style.visibility = "visible";
            setTimeout(() => alertBox.style.visibility = "hidden", 1200);
        }
    }
}


const letterEdgeCase = (letter) => {
    const forbiddens = ["alt", "shift", "tab", "control", "capslock", "1234567890"];
    return !(forbiddens.includes(letter) || forbiddens.at(-1).includes(letter));
};

const historyEdgeCase = (letter) => (letterHistory.includes(letter));

function setLetter () {
    let alphabet = 'abcdefgh';
    return letter = alphabet[Math.floor(Math.random() * alphabet.length)];
}

window.onkeydown = (e) => {
    let key = e.key;
    key = key.toLowerCase();
    check(key);
}

(() => {
    domSide.updateChoice(choices);
    domSide.updateWins(wins);
    domSide.updateLoses(loses);
})();

const reset = () => {
    letterHistory = [];
    choices = 9;
    secLetter = setLetter();
    domSide.updateChoice(choices);
    domSide.updateHistory(letterHistory);
    const interval = 2300;
    setTimeout(() => {domSide.printPlayerLetter("_"); domSide.printSecretLetter("_");}, interval);
}
