let boxes = document.querySelectorAll(".box");
let turn = 0;
let arr = Array.from(boxes);
let winningDec = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
let winnerDeclare = false;
let won = document.querySelector(".winner");
let resetGame = document.querySelector(".reset-game");

let compTurn = (i) => {
  if (winnerDeclare) return;

  if (turn === 1) {
    let number = Math.floor(Math.random() * 9);
    while (number === i || boxes[number].innerText !== "") {
      number = Math.floor(Math.random() * 9);
    }
    boxes[number].innerText = "X";
    boxes[number].style.pointerEvents = "none";
    boxes[number].disabled = true;
    turn++;
    win();
    return;
  }

  if (turn > 1) {
    // Try to win
    for (let card of winningDec) {
      let [a, b, c] = card;
      if (
        boxes[a].innerText === "X" &&
        boxes[b].innerText === "X" &&
        boxes[c].innerText === ""
      ) {
        boxes[c].innerText = "X";
        boxes[c].style.pointerEvents = "none";
        boxes[c].disabled = true;
        turn++;
        win();
        return;
      } else if (
        boxes[b].innerText === "X" &&
        boxes[c].innerText === "X" &&
        boxes[a].innerText === ""
      ) {
        boxes[a].innerText = "X";
        boxes[a].style.pointerEvents = "none";
        boxes[a].disabled = true;
        turn++;
        win();
        return;
      } else if (
        boxes[c].innerText === "X" &&
        boxes[a].innerText === "X" &&
        boxes[b].innerText === ""
      ) {
        boxes[b].innerText = "X";
        boxes[b].style.pointerEvents = "none";
        boxes[b].disabled = true;
        turn++;
        win();
        return;
      }
    }

    // Try to block
    for (let card of winningDec) {
      let [a, b, c] = card;
      if (
        boxes[a].innerText === "O" &&
        boxes[b].innerText === "O" &&
        boxes[c].innerText === ""
      ) {
        boxes[c].innerText = "X";
        boxes[c].style.pointerEvents = "none";
        boxes[c].disabled = true;
        turn++;
        win();
        return;
      } else if (
        boxes[b].innerText === "O" &&
        boxes[c].innerText === "O" &&
        boxes[a].innerText === ""
      ) {
        boxes[a].innerText = "X";
        boxes[a].style.pointerEvents = "none";
        boxes[a].disabled = true;
        turn++;
        win();
        return;
      } else if (
        boxes[c].innerText === "O" &&
        boxes[a].innerText === "O" &&
        boxes[b].innerText === ""
      ) {
        boxes[b].innerText = "X";
        boxes[b].style.pointerEvents = "none";
        boxes[b].disabled = true;
        turn++;
        win();
        return;
      }
    }

    // Random move
    let nullArr = Array.from(boxes).filter((i) => i.innerText === "");
    if (nullArr.length > 0) {
      let num = Math.floor(Math.random() * nullArr.length);
      nullArr[num].innerText = "X";
      nullArr[num].disabled = true;
      nullArr[num].style.pointerEvents = "none";
      turn++;
      win();
    }
  }
};

let resetGamefunc = () => {
  winnerDeclare = false;
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.border = "none";
    box.style.pointerEvents = "";
  }
  won.classList.add("hide");
  turn = 0;
};

let win = () => {
  for (let i of winningDec) {
    let [a, b, c] = i;
    let pos1 = boxes[a].innerText;
    let pos2 = boxes[b].innerText;
    let pos3 = boxes[c].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      winnerDeclare = true;
      if (pos1 === "X") {
        won.style.backgroundColor = "red";
        won.innerText = "AI Won!";
        boxes[a].style.border = boxes[b].style.border = boxes[c].style.border = "7px solid red";
      } else {
        won.style.backgroundColor = "rgb(211, 170, 64)";
        won.innerText = "Congratulations, You Won!";
        boxes[a].style.border = boxes[b].style.border = boxes[c].style.border = "7px solid goldenrod";
      }
      won.classList.remove("hide");
      boxes.forEach((box) => box.disabled = true);
      return;
    }
  }

  if (!winnerDeclare && turn === 9) {
    winnerDeclare = true;
    won.style.backgroundColor = "gray";
    won.innerText = "Game was Draw!";
    won.classList.remove("hide");
    boxes.forEach((box) => box.disabled = true);
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (winnerDeclare || box.innerText !== "") return;

    box.innerText = "O";
    box.style.pointerEvents = "none";
    box.disabled = true;
    turn++;
    let val = Number(box.getAttribute("id"));
    win();
    boxes.forEach((b) => b.style.pointerEvents = "none");

    setTimeout(() => {
      if (!winnerDeclare) {
        compTurn(val);
        boxes.forEach((b) => {
          if (b.innerText === "") {
            b.style.pointerEvents = "auto";
            b.disabled = false;
          }
        });
      }
    }, 1000);
  });
});

resetGame.addEventListener("click", resetGamefunc);
