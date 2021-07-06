
// game board object
const gameBoard = (() => {
  // PRIVATE

  // PUBLIC
  function checkBoard() {
    if (this.board[0] === this.board[1] && this.board[0] === this.board[2] && this.board[0] === 'X') return 'X';
    else if (this.board[0] === this.board[3] && this.board[0] === this.board[6] && this.board[0] === 'X') return 'X';
    else if (this.board[1] === this.board[4] && this.board[1] === this.board[7] && this.board[1] === 'X') return 'X';
    else if (this.board[2] === this.board[5] && this.board[2] === this.board[8] && this.board[2] === 'X') return 'X';
    else if (this.board[3] === this.board[4] && this.board[3] === this.board[5] && this.board[3] === 'X') return 'X';
    else if (this.board[6] === this.board[7] && this.board[6] === this.board[8] && this.board[6] === 'X') return 'X';

    // vertical and horizontal check '0'
    else if (this.board[0] === this.board[1] && this.board[0] === this.board[2] && this.board[0] === 'O') return 'O';
    else if (this.board[0] === this.board[3] && this.board[0] === this.board[6] && this.board[0] === 'O') return 'O';
    else if (this.board[1] === this.board[4] && this.board[1] === this.board[7] && this.board[1] === 'O') return 'O';
    else if (this.board[2] === this.board[5] && this.board[2] === this.board[8] && this.board[2] === 'O') return 'O';
    else if (this.board[3] === this.board[4] && this.board[3] === this.board[5] && this.board[3] === 'O') return 'O';
    else if (this.board[6] === this.board[7] && this.board[6] === this.board[8] && this.board[6] === 'O') return 'O';

    // tie 
    else if (this.board.every(element => element !== ' ')) return 'tie';

    // not finisd and no one wins

    else return 'undone';
  }

  function getBoard() {
    return this.board;
  }
  function setBoard(board) {
    this.board = board;
  }

  function markSpot(index, markSign) {
    this.board[index] = markSign;
  }
  function reset() {
    this.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  }


  // function
  return { getBoard, setBoard, markSpot, checkBoard, reset };
})();

// controler object
const controler = (() => {
  // PRIVATE

  // PUBLIC
  function SetChoicesToPlayers(player1, player2, choice1, choice2) {
    player1.setChoice(choice1);
    player2.setChoice(choice2);
  }
  function switchTurn(player1, player2) {
    player1.setTurn(!player1.getTurn());
    player2.setTurn(!player2.getTurn());
  }

  function upgradeScore(board, player1, player2) {
    if (board.checkBoard() === 'X' && player1.getChoice() === 'X') {
      player1.setScore(player1.getScore() + 1);
    } else if (board.checkBoard() === 'X' && player2.getChoice() === 'X') {
      player2.setScore(player2.getScore() + 1);
    } else if (board.checkBoard() === 'O' && player1.getChoice() === 'O') {
      player1.setScore(player1.getScore() + 1);
    } else if (board.checkBoard() === 'O' && player2.getChoice() === 'O') {
      player2.setScore(player2.getScore() + 1);
    } document.getElementsByClassName('cell');
  }

  function reset(gameboard, player1, player2) {
    player1.reset();
    player2.reset();
    gameBoard.reset();
  }

  return { switchTurn, upgradeScore, SetChoicesToPlayers, reset };
})();

// player object
const player = () => {
  function setName(name) {
    this.name = name;
  }
  function getName() {
    return this.name;
  }
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
  function reset() {
    this.name = ''
    this.choice = '';
    this.score = 0;
    this.turn = undefined;
  }
  return { setName, getName, setChoice, getChoice, setTurn, getTurn, setScore, getScore, reset };
}

const display = (() => {
  const PLAYGROUND = document.querySelector('.playground');
  const PLAYER_SCORE = document.querySelector('.control-panel__score__player');
  const COMP_SCORE = document.querySelector('.control-panel__score__comp');
  const TEXT_TURN = document.querySelector('.control-panel__score').children[0];
  const BTN_RESET = document.querySelector('.control-panel__reset__btn');
  const MARKS = document.querySelectorAll('.control-panel__choices__mark');
  const TURNS = document.querySelectorAll('.control-panel__choices__turn');
  const NAMES = document.querySelectorAll('.control-panel__choices__name');
  const BTN_CONFIRM = document.querySelector('.confirm');
  // PRIVATE
  function _result(gameBoard, player1, player2) {
    let result = gameBoard.checkBoard();
    if (result === player1.getChoice()) player1.setScore(player1.getScore() + 1);
    if (result === player2.getChoice()) player2.setScore(player2.getScore() + 1);
    displayControler(player1, player2);
  }
  // PUBLIC
  function displayControler(player1, player2) {
    PLAYER_SCORE.textContent = player1.getName() + ': \t' + player1.getScore();
    COMP_SCORE.textContent = player2.getName() + ': \t' + player2.getScore();
    TEXT_TURN.innerHTML = `TURN: ${player1.getTurn() ? player1.getName() : player2.getName()}`;
  }
  function displayCells(gameBoard) {
    let board = gameBoard.getBoard();
    while (PLAYGROUND.childElementCount > 0) {
      PLAYGROUND.removeChild(PLAYGROUND.firstChild);
    }
    for (let i = 0; i < board.length; i++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-index', i);
      cell.setAttribute('data-taken', false);
      cell.textContent = board[i];
      PLAYGROUND.appendChild(cell);
    }
  }
  function addEventToCells(gameBoard, controler, player1, player2) {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', (e) => {
        if (e.target.getAttribute('data-taken') === 'false') {
          let index = Number(e.target.getAttribute('data-index'));
          cells[i].textContent = player1.getTurn() ? player1.getChoice() : player2.getChoice();
          controler.switchTurn(player1, player2);
          e.target.setAttribute('data-taken', true);
          gameBoard.markSpot(index, e.target.textContent);
          _result(gameBoard, player1, player2);
        }
      });
    }
  }

  function addEventToBtn(gameBoard, controler, player1, player2) {
    BTN_RESET.addEventListener('click', (e) => {
      controler.reset(gameBoard, player1, player2);
      displayCells(gameBoard);
      displayControler(player1, player2);
      addEventToCells(gameBoard, controler, player1, player2);
      BTN_CONFIRM.disabled =false;
    })
    BTN_CONFIRM.addEventListener('click', (e) => {
      if (MARKS[0].checked) {
        player1.setChoice('X');
        player2.setChoice('O');
      } else {
        player1.setChoice('O');
        player2.setChoice('X');
      }
      player1.setName(NAMES[0].value);
      player2.setName(NAMES[1].value);
      if (TURNS[0].checked) {
        player1.setTurn(true);
        player2.setTurn(false);
      } else {
        player1.setTurn(false);
        player2.setTurn(true);
      }
      displayControler(player1, player2);
      e.target.disabled = true;
    })
  }

  return { displayCells, displayControler, addEventToCells, addEventToBtn };
})();


let player1 = player();
player1.setName('default 1');
player1.setChoice('X');
player1.setTurn(true);
player1.setScore(0);
let player2 = player();
player2.setName('default 2');
player2.setChoice('O');
player2.setTurn(false);
player2.setScore(0);
gameBoard.reset()
display.displayCells(gameBoard);
display.addEventToCells(gameBoard, controler, player1, player2);
display.addEventToBtn(gameBoard, controler, player1, player2);
display.displayControler(player1, player2);