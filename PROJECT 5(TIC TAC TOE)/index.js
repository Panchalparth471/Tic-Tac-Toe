const tct = document.querySelector(".tct");
const button = document.querySelector(".bu");
const info = document.querySelector(".info");
const boxes = document.querySelectorAll(".box");
const ng = document.querySelector("[data-NewGame]");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]

]

initGame();
//function to initialize the game
function initGame() {

    //Initializing current player to X
    currentPlayer = "X";

    //Used to check current values of boxes initially all boxes are empty
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    info.textContent = `Current Player - ${currentPlayer}`;
    boxes.forEach((box, index) => {

        //Make all boxes empty
        box.innerText = "";
        
        //Make Pointer cursor available
        boxes[index].style.pointerEvents = "all";

        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
      button.setAttribute("style", "opacity:0");
    
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
    
});

function handleClick(index) {
    if (gameGrid[index] === "") {
        gameGrid[index] = currentPlayer;
        boxes[index].innerHTML = currentPlayer;

        //To make cursor pointer none once box is clicked
        boxes[index].style.pointerEvents = "none";


        //Changing current player
        if (currentPlayer == "X")
        {
            currentPlayer = "O";
        }
        else {
            currentPlayer = "X";
        }
        info.textContent = `Current Player - ${currentPlayer}`;
        checkGameOver();
    }
}

function checkGameOver() {
    let a = 0;
    for (let i = 0; i < 9; i++) {
        if (gameGrid[i] === "") {
            a = 1;
        }
    }

    if (a == 0) {
        button.setAttribute("style", "opacity:1");
    }

    let answer = "";
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else {
                answer = "O";
            }
                    

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
          
            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            button.setAttribute("style", "opacity:1");
        }
    });

    //it means we have a winner
    if (answer !== "") {
        info.innerText = `Winner Player - ${answer}`;
        return;
    }
}
ng.addEventListener('click', () => {
    initGame();
    console.log('BUTTON CLICKED');
})