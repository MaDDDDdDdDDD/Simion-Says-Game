let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "grey", "purple"];

let started = false;
let level = 0;
let highscore = 1;

let h1 = document.querySelector("h1");
let startMessage = document.querySelector(".start-message");
let scoreDisplay = document.querySelector(".score");

document.addEventListener("keydown", handleStart);

// Updated event listener to start the game on mouse click as well
document.addEventListener("click", handleStart);

function handleStart() {
    if (!started) {
        console.log("Game Started");
        started = true;
        startMessage.innerText = "Watch closely...";
        setTimeout(() => {
            startMessage.innerText = "";
            levelUp();
        }, 1000);
    }
}

function btnFlash(btn) {
    btn.classList.add("flashBtn");
    setTimeout(() => {
        btn.classList.remove("flashBtn");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 500);
}

function levelUp() {
    userSeq = [];
    level++;
    if (level >= highscore) {
        highscore = level;
    }
    h1.innerText = `Level ${level}`;
    scoreDisplay.innerText = `Score: ${level}`;
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h1.innerText = "Game Over!";
        startMessage.innerText = `Your score: ${level}`;
        scoreDisplay.innerText = `Highscore: ${highscore}`;
        document.body.style.backgroundColor = "#d32f2f";
        setTimeout(() => {
            document.body.style.backgroundColor = "#0d0d0d";
            reset();
        }, 1000);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h1.innerText = "Simon Says";
    startMessage.innerText = "Press any key or click to start";
    scoreDisplay.innerText = "";
}
