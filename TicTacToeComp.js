let boxes = document.querySelectorAll(".box");
let turn = 0;
let arr = Array.from(boxes);
let winningDec = [[0, 1, 2] , [3, 4, 5] , [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]  // winning possibilities
let newArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let winnerDeclare = false;
let won = document.querySelector(".winner");
let resetGame = document.querySelector(".reset-game");

let compTurn = (i) => {                                  // Generating AI's move
    if (turn === 1) {
        let number = Math.floor(Math.random() * 9);
        if (number === i) {
            while (number === i) {
                number = Math.floor(Math.random() * 9);
            }
            boxes[number].innerText = "X";
            boxes[number].style.pointerEvents = "none";
            boxes[number].disabled = true;
            turn++;
            win();
        } else {
            boxes[number].innerText = "X";
            boxes[number].disabled = true;
            boxes[number].style.pointerEvents = "none";
            turn++;
            if (!winnerDeclare) {
                boxes.forEach((box) => {
                    if (box.innerText === "") {
                        box.style.pointerEvents = "auto";
                        box.disabled = false;
                    }
                });
            }
            win();
        }
    } else if (turn > 1) {
        // First, try to win
        for (let card of winningDec) {
            let val1 = boxes[card[0]];
            let val2 = boxes[card[1]];
            let val3 = boxes[card[2]];
            let values = [val1 , val2 , val3];
            
            if (
                (val1.innerText === "X" && val2.innerText === "X" && val3.innerText === "") || 
                (val2.innerText === "X" && val3.innerText === "X" && val1.innerText === "") ||
                (val3.innerText === "X" && val1.innerText === "X" && val2.innerText === "")
            ) {
                for (let value of values) {
                    if (value.innerText === "") {
                        value.innerText = "X";
                        value.style.pointerEvents = "none";
                        value.disabled = true;
                        turn++;
                        if (!winnerDeclare) {
                            boxes.forEach((box) => {
                                if (box.innerText === "") {
                                    box.style.pointerEvents = "auto";
                                    box.disabled = false;
                                }
                            });
                        }
                        win();
                        return;
                    }
                }
            }
        }
    
        // If no winning move, try to block
        for (let card of winningDec) {
            let val1 = boxes[card[0]];
            let val2 = boxes[card[1]];
            let val3 = boxes[card[2]];
            let values = [val1 , val2 , val3];
            
            if (
                (val1.innerText === "O" && val2.innerText === "O" && val3.innerText === "") || 
                (val2.innerText === "O" && val3.innerText === "O" && val1.innerText === "") ||
                (val3.innerText === "O" && val1.innerText === "O" && val2.innerText === "")
            ) {
                for (let value of values) {
                    if (value.innerText === "") {
                        value.innerText = "X";
                        value.style.pointerEvents = "none";
                        value.disabled = true;
                        turn++;
                        if (!winnerDeclare) {
                            boxes.forEach((box) => {
                                if (box.innerText === "") {
                                    box.style.pointerEvents = "auto";
                                    box.disabled = false;
                                }
                            });
                        }
                        win();
                        return;
                    }
                }
            }
        }
    
        // Else, random move
        let nullArr = Array.from(boxes).filter((i) => i.innerText === "");
        let num = Math.floor(Math.random() * nullArr.length);
        nullArr[num].innerText = "X";
        nullArr[num].disabled = true;
        nullArr[num].style.pointerEvents = "none";
        turn++;
        if (!winnerDeclare) {
            boxes.forEach((box) => {
                if (box.innerText === "") {
                    box.style.pointerEvents = "auto";
                    box.disabled = false;
                }
            });
        }
        win();
    }    
}

let resetGamefunc = () => {                     // setting up the reset button
    winnerDeclare = false;
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.border = "none";
        box.style.pointerEvents = "";
        won.classList.add("hide");
        turn = 0;
    }
}

let win = () => {                                 // checking for a win
    for (let i of winningDec) {
        let pos1 = boxes[i[0]].innerText;
        let pos2 = boxes[i[1]].innerText;
        let pos3 = boxes[i[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
                if (pos1 === "X") {
                    won.style.backgroundColor = "red";
                    won.innerText = "AI Won!"
                    won.classList.remove("hide");
                    boxes[i[0]].style.border = "7px solid red";
                    boxes[i[1]].style.border = "7px solid red";
                    boxes[i[2]].style.border = "7px solid red";
                } else {
                    won.style.backgroundColor = "rgb(211, 170, 64)";
                    won.innerText = "Congratulations, You Won!"
                    won.classList.remove("hide");
                    boxes[i[0]].style.border = "7px solid goldenrod";
                    boxes[i[1]].style.border = "7px solid goldenrod";
                    boxes[i[2]].style.border = "7px solid goldenrod";
                }
                winnerDeclare = true;
                for (let box of boxes) {
                    box.disabled = true;
                }
            }
        }
        if (turn === 9) {
            won.style.backgroundColor = "gray";
            won.innerText = "Game was Draw!";
            won.classList.remove("hide");
            winnerDeclare = true;
                for (let box of boxes) {
                    box.disabled = true;
                }
        }
}

boxes.forEach((box) => {                              // Adding Event to start the game.
    box.addEventListener("click" , () => {
        box.innerText = "O";
        box.style.pointerEvents = "none";
        box.disabled = true;
        turn++;
        let val = Number(box.getAttribute("id"));
        win();
        boxes.forEach((b) => {
            b.style.pointerEvents = "none";
        });
        setTimeout(() => {
            if (!winnerDeclare) {
                compTurn(val)
            }
        }, 1000);
    })
}) 

resetGame.addEventListener("click" , () => {               //adding event for reset button
    resetGamefunc()
})

