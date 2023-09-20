const gameboard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');

let go = 'circle'
infoDisplay.textContent = "Circle goes first";

const startCell = [
    '',  '', '', '', '', '', '', '', '',
]

const createBoard = () => {
    startCell.forEach((_cell, index) => {
        const insideSquare = document.createElement('div');
        insideSquare.classList.add('insideSquare')
        insideSquare.id = index
        gameboard.append(insideSquare);
        insideSquare.addEventListener('click', addGo)
    });
}

const addGo = (e) => {
     const goDisplay = document.createElement('div');
     goDisplay.classList.add(go);
     e.target.append(goDisplay)
     go = go === 'circle' ? 'cross': 'circle';
     infoDisplay.textContent = 'it is not ' + go + "'s go";
     e.target.removeEventListener('click', addGo)
     checkScore()
};

const checkScore = () => {
    const allSquares =  document.querySelectorAll('.insideSquare');
    // console.log(allSquares[0]);
    const winningCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
        ];
    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))

          if (circleWins)  {
            infoDisplay.textContent = 'Circle Wins!';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return
          }

    });
    winningCombos.forEach(array => {
        const crosseWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))

          if (crosseWins)  {
            infoDisplay.textContent = 'Cross Wins!';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return
          }

    });
}
createBoard()

