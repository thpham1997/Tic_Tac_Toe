
// game board object
const gameBoard = (() => {
  const PLAYGROUND = document.querySelector('.playground');
  let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

  function _markSpot(e, player) {
    console.log(!!e.target.getAttribute('data-taken'));
    if (!!e.target.getAttribute('data-taken')) {
      e.target.textContent = player.getChoice();
      e.target.setAttribute('data-taken', true);
    }
  }
  function display() {
    for (let i = 0; i < board.length; i++) {
      let cellDiv = document.createElement('div');
      cellDiv.addEventListener('click', (e) => {
        console.log('event run');
        _markSpot(e, player1);
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
const displayControler = (() => {

  return {};
})();

// player object
const player = (name, isPlayer) => {
  this.isPlayer = isPlayer;
  this.choice = '';
  function setChoice(choice) {
    this.choice = choice;
  }
  function getChoice() {
    return this.choice;
  }
  function isPlayer() {
    return this.isPlayer;
  }
  return { isPlayer, setChoice, getChoice };
}
player1 = player('thanh', true);
player1.setChoice('X');
gameBoard.display();