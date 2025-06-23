let boxes = document.querySelectorAll(".box");
let playerTurn = document.querySelector(".player-turn")
let turnO = true;       //Player Turns

let winningPat =  [      //Winning Paterns
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let box of boxes) {       //Adding event to add O or X text when clicking boxes
    box.addEventListener("click" , () => {
        playerTurn.classList.remove("hidden")
        if (turnO) {
            box.innerText = "O";
            box.style.fontFamily = "'Courier New', Courier, monospace";
            box.style.fontSize = window.innerWidth <= 480 ? "6vmin" : "8vmin";
            box.style.fontWeight = 700;
            box.style.fontSize = "8vmin";
            turnO = false;
            playerTurn.innerText = "Player X's Turn: "
        } else {
            box.innerText = "X";
            box.style.fontSize = window.innerWidth <= 480 ? "6vmin" : "8vmin";
            box.style.fontFamily = "'Courier New', Courier, monospace";
            box.style.fontWeight = 700;
            box.style.fontSize = "8vmin";
            turnO = true;
            playerTurn.innerText = "Player O's Turn: "
        }
        box.disabled = true;
        box.style.pointerEvents = "none"
        checkWinner()    //Calling the function to check winner
    })
}

const checkWinner = () => {      //Function to check the winner.
    for (let pat of winningPat) {
        let pos1 = boxes[pat[0]].innerText;
        let pos2 = boxes[pat[1]].innerText;
        let pos3 = boxes[pat[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                disablefunct();
                hideBefore(pos1);
            }
        }
    }
};

let winner = document.querySelector(".winner");     // funct for declaring the Winner
let newGame = document.querySelector(".new-game");
let resetGame = document.querySelector(".reset-game")
let hideBefore = (win) => {
    winner.classList.remove("hide");
    newGame.classList.remove("hide")
    winner.innerText = `Congratulations, Winner is ${win}`
};


let repeat = () => {      // Setting Up the New and Reset Game button
    turnO = true;
    for (let box of boxes) {
        box.innerText = "";
    }
    winner.classList.add("hide");
    newGame.classList.add("hide")
}

const enablingDiv = () => {
    for (let box of boxes) {
        box.style.pointerEvents = "";
    }
}

resetGame.addEventListener("click" , () => {
    enablingDiv()
    repeat();
    enablefunct();
});

newGame.addEventListener("click" , () => {
    enablingDiv();
    repeat();
    enablefunct()
});

let disablefunct = () => {
    for (box of boxes) {
        box.disabled = true
    }
}

let enablefunct = () => {
    for (box of boxes) {
        box.disabled = false
    }
}
