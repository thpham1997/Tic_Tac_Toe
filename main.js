
// game board object
const gameBoard = (() => {
  const PLAYGROUND = document.querySelector('.playground');
  let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

  function _markSpot(e, players) {
    console.log(e.target.getAttribute('data-taken') === 'true');
    if (e.target.getAttribute('data-taken') === 'false') {
      e.target.textContent = players[0].getTurn() ? players[0].getChoice() : players[1].getChoice();
      board[e.target.getAttribute('data-index')] = e.target.textContent;
      e.target.setAttribute('data-taken', true);
    }
    console.log(board);
  }
  function getBoard() {
    return board;
  }
  function display(controler, players) {
    for (let i = 0; i < board.length; i++) {
      let cellDiv = document.createElement('div');
      cellDiv.addEventListener('click', (e) => {
        console.log('event run');
        _markSpot(e, players);
        controler.switchTurn(players[0], players[1]);
        controler.setResult(controler.checkGame(board));
        console.log(controler.getResult());
      });
      cellDiv.classList.add('cell');
      cellDiv.textContent = board[i];
      cellDiv.setAttribute('data-index', i);
      cellDiv.setAttribute('data-taken', false);
      PLAYGROUND.appendChild(cellDiv);
    }
  }

  // function
  return { display };
})();

// controler object
const controler = (() => {
  const PLAYER_SCORE = document.getElementsByClassName('control-panel__score__player');
  const COMP_SCORE = document.getElementsByClassName('control-panel__score__comp');

  function checkGame(board) {
    // vertical and horizontal check 'X'
    if (board[0] === board[1] && board[0] === board[2] && board[0] === 'X') return 'X';
    else if (board[0] === board[3] && board[0] === board[6] && board[0] === 'X') return 'X';
    else if (board[1] === board[4] && board[1] === board[7] && board[1] === 'X') return 'X';
    else if (board[2] === board[5] && board[2] === board[8] && board[2] === 'X') return 'X';
    else if (board[3] === board[4] && board[3] === board[5] && board[3] === 'X') return 'X';
    else if (board[6] === board[7] && board[6] === board[8] && board[6] === 'X') return 'X';

    // vertical and horizontal check '0'
    else if (board[0] === board[1] && board[0] === board[2] && board[0] === 'O') return 'O';
    else if (board[0] === board[3] && board[0] === board[6] && board[0] === 'O') return 'O';
    else if (board[1] === board[4] && board[1] === board[7] && board[1] === 'O') return 'O';
    else if (board[2] === board[5] && board[2] === board[8] && board[2] === 'O') return 'O';
    else if (board[3] === board[4] && board[3] === board[5] && board[3] === 'O') return 'O';
    else if (board[6] === board[7] && board[6] === board[8] && board[6] === 'O') return 'O';

    // tie 
    else if (board.every(element => element !== ' ')) return 'tie';

    // not finisd and no one wins

    else return 'undone';
  }

  function setResult(result) {
    this.result = result
  }
  function getResult() {
    return this.result;
  }

  function switchTurn(player1, player2) {
    player1.setTurn(!player1.getTurn());
    player2.setTurn(!player2.getTurn());
  }

  function display(players) {
    console.log('run');
    PLAYER_SCORE.textContent = players[0].getScore();
    COMP_SCORE.textContent = players[1].getScore();
  }
  return { display, switchTurn, setResult, getResult, checkGame };
})();

// player object
const player = (name) => {
  function setChoice(choice) {
    this.choice = choice;
  }
  function getChoice() {
    return this.choice;
  }
  function setTurn(turn) {
    this.turn = turn;
  }
  function getTurn() {
    return this.turn;
  }
  function setScore(score) {
    this.score = score;
  }
  function getScore() {
    return this.score;
  }
  return { setChoice, getChoice, setTurn, getTurn, setScore, getScore };
}
let player1 = player('thanh');
player1.setChoice('X');
player1.setTurn(true);
player1.setScore(0);
let player2 = player('comp');
player2.setChoice('O');
player2.setTurn(false);
player2.setScore(0);
gameBoard.display(controler, [player1, player2]);
controler.display([player1, player2]);