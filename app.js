const gameboard = document.getElementById('gameboard');
const boxes = Array.from(document.getElementsByClassName('box'));
const playText = document.getElementById('playText');
const restartBtn = document.getElementById('restartBtn');

const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "0";
const X_TEXT = "X";
let currentPlayer;


const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';

        // checking the border on the top
        if(index < 3) {
            styleString += 'border-bottom: 3px solid var(--purple);';
        }

        // checking the border on the left
        if(index % 3 === 0) {
            styleString += 'border-right: 3px solid var(--purple);';
        }

        // checking the border on the right
        if(index % 3 === 2) {
            styleString += 'border-left: 3px solid var(--purple);';
        }

        // checking the border on the bottom
        if(index > 5) {
            styleString += 'border-top: 3px solid var(--purple);';
        }

        box.style = styleString;
        box.addEventListener('click', boxClicked);

    });
};

const boxClicked = (event) => {
    const id = event.target.id; 

    if(!spaces[id]){
        spaces[id] = currentPlayer;
        event.target.innerText = currentPlayer;

        if(playerHasWon(currentPlayer)){
            playText.innerHTML = `${currentPlayer} has won!`;
            return;
        }
        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    }
}

const playerHasWon = () => {
    if(spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            console.log(`${currentPlayer} has won on top!`)
            return true;
        }

        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
            console.log(`${currentPlayer} has won on left!`)
            return true;
        }

        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            console.log(`${currentPlayer} has won on diagnally!`)
            return true;
        }
    }
    if(spaces[8] === currentPlayer){
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer){
            console.log(`${currentPlayer} has won on right!`)
            return true;
        }

        if(spaces[6] === currentPlayer && spaces[7] === currentPlayer){
            console.log(`${currentPlayer} has won on bottom!`)
            return true;
        }
    }

    if(spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            console.log(`${currentPlayer} has won on vertically in the middle!`)
        }
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            console.log(`${currentPlayer} has won on vertically in the middle!`)
        }
    }
}



const restart = () => {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    })
    boxes.forEach((box) => {
        box.innerText = '';
    })
    playText.innerText = `Let's Play!`;
    currentPlayer = O_TEXT;
}

restartBtn.addEventListener('click', restart);
restart();

drawBoard();