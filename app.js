// HTML Elements
const statusDiv = document.querySelector('.status')
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');


// game constants

const xSymbol = '×';
const oSymbol = '○';

// game variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;
let won = false;
//functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if(winner === 'X')
        {
        statusDiv.innerHTML = `<span3><h2>X Winner!</h2></span3>`;
        //${letterToSymbol(winner)}
        won =true;
        }
        else{
            statusDiv.innerHTML = `<span2><h2>O Winner!<h2></span2>`;
            //${letterToSymbol(winner)}
            won =true;
        }
};
const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    //Check winner

    if(topLeft && topLeft === topMiddle && topLeft === topRight){
       handleWin(topLeft);
       cellDivs[0].classList.add('won');
       cellDivs[1].classList.add('won');
       cellDivs[2].classList.add('won');
    }
    else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
        handleWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }
    else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }
    else if(topRight && topRight === middleRight && topRight === bottomRight){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topRight && topRight === middleMiddle && topRight === bottomLeft){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusDiv.innerHTML = '<span1>DRAW</span1>';
    }
    else{
        xIsNext = !xIsNext;
        if(xIsNext){
            statusDiv.innerHTML = `<span3>X Turn</span3>`;
            //${xSymbol}
        } else {
            statusDiv.innerHTML = `<span2>O Turn</span2>`;
            //${oSymbol}
        }
    }
    
};


//event Handlers
const handleReset = () => {
   xIsNext = true;
   won = false;
   statusDiv.innerHTML = `<span3>X Turn</span3>`; 
   //${xSymbol}
   winner = null;
   for(const cellDiv of cellDivs) {
    cellDiv.classList.remove('X');
    cellDiv.classList.remove('O');
    cellDiv.classList.remove('won');
   }
};
const handleCellClick = (e) => {
   
    const classList = e.target.classList;
    if(classList[1] === 'X' || classList[1] === 'O' ){
        return;
    };

    if(!won){
        if(xIsNext ){
            classList.add('X');
            checkGameStatus();
        }
        else{
            classList.add('O');
            checkGameStatus();
        }
    }
    
};

//event Listeners
resetDiv.addEventListener('click',handleReset);

for(const cellDiv of cellDivs) {
    cellDiv.addEventListener('click',handleCellClick)
}