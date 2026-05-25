let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

/* =========================
   LOADER
========================= */


window.onload = function () {

    const loader = document.getElementById("loader");

    loader.style.display = "flex";

    setTimeout(() => {

        loader.style.animation = "fadeOut 1s forwards";

        setTimeout(() => {

            loader.remove();

        }, 1000);

    }, 2500);

};


/* =========================
   WIN PATTERNS
========================= */

const winPatterns = [

    [0,1,2],
    [0,3,6],
    [0,4,8],

    [1,4,7],

    [2,5,8],
    [2,4,6],

    [3,4,5],

    [6,7,8]

];

/* =========================
   RESET GAME
========================= */

const resetGame = () => {

    turnO = true;

    enableBoxes();

    msgContainer.classList.add("hide");
};

/* =========================
   BOX CLICK EVENTS
========================= */

boxes.forEach((box) => {

    box.addEventListener("click", () => {

        /* Prevent double clicking */

        if(box.innerText !== ""){
            return;
        }

        /* Turn Logic */

        if(turnO){

            box.innerText = "O";

            turnO = false;

        }else{

            box.innerText = "X";

            turnO = true;
        }

        box.disabled = true;

        checkWinner();
    });
});

/* =========================
   DISABLE BOXES
========================= */

const disableBoxes = () => {

    for(let box of boxes){

        box.disabled = true;
    }
};

/* =========================
   ENABLE BOXES
========================= */

const enableBoxes = () => {

    for(let box of boxes){

        box.disabled = false;

        box.innerText = "";
    }
};

/* =========================
   SHOW WINNER
========================= */

const showWinner = (winner) => {

    msg.innerText = `Congratulations! Winner is ${winner}`;

    msgContainer.classList.remove("hide");

    disableBoxes();
};

/* =========================
   SHOW DRAW
========================= */

const showDraw = () => {

    msg.innerText = "Game Draw!";

    msgContainer.classList.remove("hide");
};

/* =========================
   CHECK WINNER
========================= */

const checkWinner = () => {

    let winnerFound = false;

    for(let pattern of winPatterns){

        let pos1Val = boxes[pattern[0]].innerText;

        let pos2Val = boxes[pattern[1]].innerText;

        let pos3Val = boxes[pattern[2]].innerText;

        if(
            pos1Val !== "" &&
            pos2Val !== "" &&
            pos3Val !== ""
        ){

            if(
                pos1Val === pos2Val &&
                pos2Val === pos3Val
            ){

                winnerFound = true;

                showWinner(pos1Val);

                return;
            }
        }
    }

    /* DRAW CHECK */

    let count = 0;

    for(let box of boxes){

        if(box.innerText !== ""){
            count++;
        }
    }

    if(count === 9 && !winnerFound){

        showDraw();
    }
};

/* =========================
   BUTTON EVENTS
========================= */

newGameBtn.addEventListener("click", resetGame);

resetBtn.addEventListener("click", resetGame);