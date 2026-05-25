/* =========================================
   ELEMENT SELECTIONS
========================================= */

const boxes = document.querySelectorAll(".box");

const resetBtn = document.querySelector("#reset-btn");

const newBtn = document.querySelector("#new-btn");

const msgContainer = document.querySelector(".msg-container");

const msg = document.querySelector("#msg");

const msgTitle = document.querySelector("#msg-title");

const playAgainBtn = document.querySelector("#play-again-btn");

const closeMsgBtn = document.querySelector("#close-msg-btn");

const playerTurn = document.querySelector("#player-turn");

const historyList = document.querySelector("#history-list");

const loader = document.querySelector("#loader");

const quoteText = document.querySelector("#quote-text");

const winningLine = document.querySelector("#winning-line");

/* =========================================
   AUDIO
========================================= */

const clickSound = document.querySelector("#click-sound");

const winSound = document.querySelector("#win-sound");

const drawSound = document.querySelector("#draw-sound");

const hoverSound = document.querySelector("#hover-sound");

const bgMusic = document.querySelector("#bg-music");

/* =========================================
   SCORE ELEMENTS
========================================= */

const oScoreElement = document.querySelector("#o-score");

const xScoreElement = document.querySelector("#x-score");

const drawScoreElement = document.querySelector("#draw-score");

/* =========================================
   STATISTICS
========================================= */

const totalGamesElement = document.querySelector("#total-games");

const winStreakElement = document.querySelector("#win-streak");

const fastestWinElement = document.querySelector("#fastest-win");

const dominantPlayerElement = document.querySelector("#dominant-player");

/* =========================================
   GAME VARIABLES
========================================= */

let turnO = true;

let moveCount = 0;

let currentMode = "pvp";

let gameOver = false;

let currentStreak = 0;

let fastestVictory = Infinity;

let moveHistory = [];

let totalGames = 0;

let oScore = 0;

let xScore = 0;

let drawScore = 0;

/* =========================================
   WIN PATTERNS
========================================= */

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

/* =========================================
   QUOTES
========================================= */

const quotes = [

    "Pain creates warriors.",

    "Every move defines destiny.",

    "Victory belongs to patience.",

    "The battlefield remembers everything.",

    "Strategic minds dominate chaos.",

    "Legends are forged through pressure.",

    "Fear loses against intelligence.",

    "A tactical soul never surrenders."
];

/* =========================================
   LOADER
========================================= */

window.onload = () => {

    setTimeout(() => {

        loader.style.transition = "1.5s ease";

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

            bgMusic.volume = 0.2;

            bgMusic.play();

        },1500);

    },3500);
};

/* =========================================
   RANDOM QUOTES
========================================= */

setInterval(() => {

    let randomIndex = Math.floor(Math.random() * quotes.length);

    quoteText.innerText = quotes[randomIndex];

},5000);

/* =========================================
   TURN DISPLAY
========================================= */

const updateTurnDisplay = () => {

    playerTurn.innerText = turnO ? "O" : "X";

    if(turnO){

        playerTurn.style.color = "cyan";

        playerTurn.style.textShadow = "0 0 20px cyan";

    }else{

        playerTurn.style.color = "#ff004c";

        playerTurn.style.textShadow = "0 0 20px #ff004c";
    }
};

/* =========================================
   BUTTON HOVER SOUND
========================================= */

document.querySelectorAll("button").forEach((button) => {

    button.addEventListener("mouseenter",() => {

        hoverSound.currentTime = 0;

        hoverSound.play();

    });

});

/* =========================================
   RESET GAME
========================================= */

const resetGame = () => {

    turnO = true;

    moveCount = 0;

    gameOver = false;

    moveHistory = [];

    historyList.innerHTML = `
    
        <p class="empty-history">
            No moves yet...
        </p>
    
    `;

    winningLine.style.width = "0";

    boxes.forEach((box) => {

        box.innerText = "";

        box.disabled = false;

        box.classList.remove("win");

    });

    updateTurnDisplay();

    msgContainer.classList.add("hide");
};

/* =========================================
   SHOW MESSAGE
========================================= */

const showMessage = (title,text) => {

    msgTitle.innerText = title;

    msg.innerText = text;

    msgContainer.classList.remove("hide");
};

/* =========================================
   UPDATE SCORES
========================================= */

const updateScores = () => {

    oScoreElement.innerText = oScore;

    xScoreElement.innerText = xScore;

    drawScoreElement.innerText = drawScore;
};

/* =========================================
   UPDATE STATS
========================================= */

const updateStats = () => {

    totalGamesElement.innerText = totalGames;

    winStreakElement.innerText = currentStreak;

    if(fastestVictory !== Infinity){

        fastestWinElement.innerText = `${fastestVictory} Turns`;

    }

    if(oScore > xScore){

        dominantPlayerElement.innerText = "O";

    }else if(xScore > oScore){

        dominantPlayerElement.innerText = "X";

    }else{

        dominantPlayerElement.innerText = "Equal";
    }
};

/* =========================================
   DISABLE BOXES
========================================= */

const disableBoxes = () => {

    boxes.forEach((box) => {

        box.disabled = true;

    });
};

/* =========================================
   ADD MOVE HISTORY
========================================= */

const addMoveHistory = (player,index) => {

    const positionNames = [

        "Top Left",
        "Top Center",
        "Top Right",

        "Middle Left",
        "Center",
        "Middle Right",

        "Bottom Left",
        "Bottom Center",
        "Bottom Right"
    ];

    moveHistory.push(

        `${moveCount}. ${player} → ${positionNames[index]}`
    );

    historyList.innerHTML = "";

    moveHistory.forEach((move) => {

        const moveElement = document.createElement("p");

        moveElement.style.marginBottom = "1rem";

        moveElement.innerText = move;

        historyList.appendChild(moveElement);

    });
};

/* =========================================
   WINNER EFFECT
========================================= */

const activateWinnerEffect = (pattern) => {

    pattern.forEach((index) => {

        boxes[index].classList.add("win");

    });

    winningLine.style.width = "100%";
};

/* =========================================
   SHOW WINNER
========================================= */

const showWinner = (winner,pattern) => {

    gameOver = true;

    totalGames++;

    currentStreak++;

    if(moveCount < fastestVictory){

        fastestVictory = moveCount;
    }

    activateWinnerEffect(pattern);

    if(winner === "O"){

        oScore++;

    }else{

        xScore++;
    }

    updateScores();

    updateStats();

    winSound.play();

    disableBoxes();

    showMessage(

        "TACTICAL VICTORY",

        `${winner} Dominated The Battlefield`
    );
};

/* =========================================
   SHOW DRAW
========================================= */

const showDraw = () => {

    gameOver = true;

    totalGames++;

    drawScore++;

    currentStreak = 0;

    updateScores();

    updateStats();

    drawSound.play();

    showMessage(

        "DRAW",

        "Two Tactical Minds Collided Equally"
    );
};

/* =========================================
   CHECK WINNER
========================================= */

const checkWinner = () => {

    for(let pattern of winPatterns){

        let pos1 = boxes[pattern[0]].innerText;

        let pos2 = boxes[pattern[1]].innerText;

        let pos3 = boxes[pattern[2]].innerText;

        if(

            pos1 !== "" &&
            pos2 !== "" &&
            pos3 !== ""

        ){

            if(

                pos1 === pos2 &&
                pos2 === pos3

            ){

                showWinner(pos1,pattern);

                return;
            }
        }
    }

    if(moveCount === 9 && !gameOver){

        showDraw();
    }
};

/* =========================================
   AI MOVE
========================================= */

const aiMove = () => {

    if(gameOver){

        return;
    }

    let emptyBoxes = [];

    boxes.forEach((box,index) => {

        if(box.innerText === ""){

            emptyBoxes.push(index);
        }
    });

    if(emptyBoxes.length === 0){

        return;
    }

    let randomIndex = emptyBoxes[
        Math.floor(Math.random() * emptyBoxes.length)
    ];

    boxes[randomIndex].innerText = "X";

    boxes[randomIndex].disabled = true;

    moveCount++;

    addMoveHistory("X",randomIndex);

    clickSound.play();

    checkWinner();

    turnO = true;

    updateTurnDisplay();
};

/* =========================================
   BOX EVENTS
========================================= */

boxes.forEach((box,index) => {

    box.addEventListener("click",() => {

        if(

            box.innerText !== "" ||
            gameOver

        ){

            return;
        }

        clickSound.currentTime = 0;

        clickSound.play();

        moveCount++;

        if(turnO){

            box.innerText = "O";

            addMoveHistory("O",index);

            turnO = false;

        }else{

            box.innerText = "X";

            addMoveHistory("X",index);

            turnO = true;
        }

        box.disabled = true;

        updateTurnDisplay();

        checkWinner();

        /* =========================
           AI MODES
        ========================= */

        if(

            !turnO &&
            currentMode !== "pvp" &&
            !gameOver

        ){

            setTimeout(() => {

                aiMove();

            },700);
        }

    });

});

/* =========================================
   BUTTON EVENTS
========================================= */

resetBtn.addEventListener(

    "click",

    resetGame
);

newBtn.addEventListener(

    "click",

    resetGame
);

playAgainBtn.addEventListener(

    "click",

    resetGame
);

closeMsgBtn.addEventListener(

    "click",

    () => {

        msgContainer.classList.add("hide");

    }
);

/* =========================================
   MODE BUTTONS
========================================= */

const modeButtons = document.querySelectorAll(".mode-btn");

modeButtons.forEach((button) => {

    button.addEventListener("click",() => {

        modeButtons.forEach((btn) => {

            btn.classList.remove("active-mode");

        });

        button.classList.add("active-mode");

        if(button.id === "pvp-mode"){

            currentMode = "pvp";

        }

        if(button.id === "easy-ai"){

            currentMode = "easy";
        }

        if(button.id === "medium-ai"){

            currentMode = "medium";
        }

        if(button.id === "hard-ai"){

            currentMode = "hard";
        }

        resetGame();

    });

});

/* =========================================
   THEME SWITCHER
========================================= */

const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach((button) => {

    button.addEventListener("click",() => {

        themeButtons.forEach((btn) => {

            btn.classList.remove("active-theme");

        });

        button.classList.add("active-theme");

        if(button.id === "cyber-theme"){

            document.documentElement.style.setProperty(
                "--primary-glow",
                "cyan"
            );

            document.body.style.background =
            "radial-gradient(circle at top,#0f172a,#050816)";
        }

        if(button.id === "galaxy-theme"){

            document.documentElement.style.setProperty(
                "--primary-glow",
                "#9b5cff"
            );

            document.body.style.background =
            "radial-gradient(circle at top,#2b1055,#000000)";
        }

        if(button.id === "blood-theme"){

            document.documentElement.style.setProperty(
                "--primary-glow",
                "#ff004c"
            );

            document.body.style.background =
            "radial-gradient(circle at top,#330000,#000000)";
        }

    });

});

/* =========================================
   INITIALIZE
========================================= */

updateTurnDisplay();

updateScores();

updateStats();